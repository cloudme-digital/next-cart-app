import { useContext, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import { CartContext } from '@/stores/CartProvider';
import Button from '@/components/UI/Button.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

import {
  getFormattedCart,
  getUpdatedItems,
  handleQuantityChange,
  IProductRootObject,
} from '@/utils/functions/functions';

import { GET_CART } from '@/utils/gql/GQL_QUERIES';
import { UPDATE_CART } from '@/utils/gql/GQL_MUTATIONS';

const CartContents = () => {
  const router = useRouter();
  const { setCart } = useContext(CartContext);
  const isCheckoutPage = router.pathname === '/checkout';

  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      const updatedCart = getFormattedCart(data);
      if (!updatedCart && !data.cart.contents.nodes.length) {
        localStorage.removeItem('woocommerce-cart');
        setCart(null);
        return;
      }
      localStorage.setItem('woocommerce-cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    },
  });

  const [updateCart, { loading: updateCartProcessing }] = useMutation(
    UPDATE_CART,
    {
      onCompleted: () => {
        refetch();
        setTimeout(() => {
          refetch();
        }, 3000);
      },
    },
  );

  const handleRemoveProductClick = (
    cartKey: string,
    products: IProductRootObject[],
  ) => {
    if (products?.length) {
      const updatedItems = getUpdatedItems(products, 0, cartKey);
      updateCart({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            items: updatedItems,
          },
        },
      });
    }
    refetch();
    setTimeout(() => {
      refetch();
    }, 3000);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const cartTotal = data?.cart?.total || '0';

  const getUnitPrice = (subtotal: string, quantity: number) => {
    const numericSubtotal = parseFloat(subtotal.replace(/[^0-9.-]+/g, ''));
    return isNaN(numericSubtotal)
      ? 'N/A'
      : (numericSubtotal / quantity).toFixed(3);
  };

  return (
    <div className="px-4 py-8">
      {data?.cart?.contents?.nodes?.length ? (
        <div className="space-y-4">
          {data.cart.contents.nodes.map((item: IProductRootObject) => (
            <div key={item.key} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-24 h-24 relative mb-4 sm:mb-0 sm:mr-4">
                  <Image
                    src={
                      item.product.node.image?.sourceUrl ||
                      '/images/placeholder.png'
                    }
                    alt={item.product.node.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h2 className="text-lg font-semibold mb-2">
                    {item.product.node.name}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    BHD {getUnitPrice(item.subtotal, item.quantity)} x{' '}
                    {item.quantity}
                  </p>
                  <p className="text-lg font-semibold">
                    {item.subtotal.replace('&nbsp;', ' ')}
                  </p>
                </div>
                <div className="flex flex-col items-center mt-4 sm:mt-0">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) => {
                      handleQuantityChange(
                        event,
                        item.key,
                        data.cart.contents.nodes,
                        updateCart,
                        updateCartProcessing,
                      );
                    }}
                    className="w-16 px-2 py-1 text-center border border-gray-300 rounded mb-2"
                  />
                  <Button
                    handleButtonClick={() =>
                      handleRemoveProductClick(
                        item.key,
                        data.cart.contents.nodes,
                      )
                    }
                    color="red"
                    buttonDisabled={updateCartProcessing}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-md p-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-xl font-bold">
                {cartTotal.replace('&nbsp;', ' ')}
              </span>
            </div>
            {!isCheckoutPage && (
              <Link href="/checkout" passHref>
                <Button fullWidth>Checkout</Button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">No products in the cart</h2>
          <Link href="/products" passHref>
            <Button>Continue shopping</Button>
          </Link>
        </div>
      )}
      {updateCartProcessing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg mb-2">Updating cart...</p>
            <LoadingSpinner />
          </div>
        </div>
      )}
      <div className="h-20"></div>
    </div>
  );
};

export default CartContents;
