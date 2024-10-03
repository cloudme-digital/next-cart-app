// Imports
import Link from 'next/link';

// Components
import CartButton from './CartButton.component';

// Utils
import useIsMobile from '@/utils/hooks/useIsMobile';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Navbar = () => {
  const isMobile = useIsMobile();
  return (
    <header>
      <nav id="header" className="top-0 z-50 w-full py-1 bg-white ">
        <div className="container flex md:flex-wrap flex-col md:flex-row items-center justify-between px-6 py-3 mx-auto mt-0 md:min-w-96">
          <div
            className="order-3 hidden w-full md:flex md:items-center md:w-auto md:order-1"
            id="menu"
          >
            <ul className="items-center justify-between pt-4 text-base text-gray-700 md:flex md:pt-0">
              <li>
                <Link href="/products">
                  <span className="inline-block py-2 pr-4 text-xl font-bold no-underline hover:underline">
                    Catalogue
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/categories">
                  <span className="inline-block py-2 pr-4 text-xl font-bold no-underline hover:underline">
                    Categories
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div id="logo" className="order-1 md:order-2">
            <Link href="/">
              <span className="flex items-center text-xl font-bold tracking-wide text-gray-800 no-underline hover:no-underline ">
                <svg
                  className="mr-2 text-black fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  aria-label="Shopping Cart App logo"
                >
                  <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
                </svg>
                Shopping Cart App
              </span>
            </Link>
          </div>
          <div
            className="flex items-center order-2 md:order-3"
            id="nav-content"
          >
            {!isMobile && <CartButton />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
