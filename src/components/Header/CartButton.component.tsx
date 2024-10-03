import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';

import { CartContext } from '@/stores/CartProvider';

interface ICartProps {
  stickyNav?: boolean;
}

/**
 * Displays the shopping cart contents.
 * Displays amount of items in cart.
 */
const CartButton = ({ stickyNav }: ICartProps) => {
  const { cart } = useContext(CartContext);
  const [productCount, setProductCount] = useState<number | null | undefined>();

  useEffect(() => {
    if (cart) {
      setProductCount(cart.totalProductsCount);
    } else {
      setProductCount(null);
    }
  }, [cart]);

  return (
    <div className="relative">
      <Link href="/cart">
        <span className="pl-4 mt-4 no-underline inline-block" aria-label="Cart">
          <svg
            className={`w-8 h-8 ${stickyNav ? 'text-white' : 'text-current'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </span>
      </Link>

      {productCount && (
        <span
          className={`absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs font-bold rounded-full
          ${stickyNav ? 'text-black bg-white' : 'text-white bg-blue-500'}`}
        >
          {productCount}
        </span>
      )}
    </div>
  );
};

export default CartButton;
