/*eslint complexity: ["error", 20]*/
// Imports
import { useState, useContext, useEffect } from 'react';
import { useQuery, useMutation, ApolloError } from '@apollo/client';

// Components
import Billing from './Billing.component';
import CartContents from '../Cart/CartContents.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

// GraphQL
import { GET_CART } from '@/utils/gql/GQL_QUERIES';
import { CHECKOUT_MUTATION } from '@/utils/gql/GQL_MUTATIONS';
import { CartContext } from '@/stores/CartProvider';

// Utils
import {
  getFormattedCart,
  createCheckoutData,
  ICheckoutDataProps,
} from '@/utils/functions/functions';

export interface IBilling {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  postcode: string;
  email: string;
  phone: string;
}

export interface IShipping {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  postcode: string;
  email: string;
  phone: string;
}

export interface ICheckoutData {
  clientMutationId: string;
  billing: IBilling;
  shipping: IShipping;
  shipToDifferentAddress: boolean;
  paymentMethod: string;
  isPaid: boolean;
  transactionId: string;
}

const CheckoutForm = () => {
  const { cart, setCart } = useContext(CartContext);
  const [orderData, setOrderData] = useState<ICheckoutData | null>(null);
  const [requestError, setRequestError] = useState<ApolloError | null>(null);
  const [orderCompleted, setorderCompleted] = useState<boolean>(false);

  // Get cart data query
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);

      if (!updatedCart && !data.cart.contents.nodes.length) {
        localStorage.removeItem('woo-session');
        localStorage.removeItem('wooocommerce-cart');
        setCart(null);
        return;
      }

      localStorage.setItem('woocommerce-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Checkout GraphQL mutation
  const [checkout, { loading: checkoutLoading }] = useMutation(
    CHECKOUT_MUTATION,
    {
      variables: {
        input: orderData,
      },
      onCompleted: () => {
        localStorage.removeItem('woo-session');
        localStorage.removeItem('wooocommerce-cart');
        setorderCompleted(true);
        setCart(null);
        refetch();
      },
      onError: (error) => {
        setRequestError(error);
        refetch();
      },
    },
  );

  useEffect(() => {
    if (null !== orderData) {
      // Perform checkout mutation when the value for orderData changes.
      checkout();
      setTimeout(() => {
        refetch();
      }, 2000);
    }
  }, [checkout, orderData, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleFormSubmit = (submitData: ICheckoutDataProps) => {
    const checkOutData = createCheckoutData(submitData);

    setOrderData(checkOutData);
    setRequestError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {cart && !orderCompleted ? (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <CartContents />
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
            <Billing handleFormSubmit={handleFormSubmit} />
          </div>
          {/*Error display*/}
          {requestError && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> An error has occurred.</span>
            </div>
          )}
          {/* Checkout Loading*/}
          {checkoutLoading && (
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <p className="text-xl mb-2">Processing order, please wait...</p>
              <LoadingSpinner />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          {!cart && !orderCompleted && (
            <h1 className="text-2xl font-bold mb-4">No products in the cart</h1>
          )}
          {orderCompleted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <strong className="font-bold">Thank you for your order!</strong>
              <span className="block sm:inline">
                {' '}
                Your order has been successfully placed.
              </span>
            </div>
          )}
        </div>
      )}
      {/* Add extra space at the bottom */}
      <div className="h-20"></div>
    </div>
  );
};

export default CheckoutForm;
