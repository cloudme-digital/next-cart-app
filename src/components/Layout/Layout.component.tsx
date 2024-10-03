// Imports
import { ReactNode, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';

// Components
import Header from '@/components/Header/Header.component';
import PageTitle from './PageTitle.component';
import BottomNav from '@/components/Footer/BottomNav.component';

// State
import { CartContext } from '@/stores/CartProvider';

// Utils
import { getFormattedCart } from '@/utils/functions/functions';
import useIsMobile from '@/utils/hooks/useIsMobile';

// GraphQL
import { GET_CART } from '@/utils/gql/GQL_QUERIES';

interface ILayoutProps {
  children?: ReactNode;
  title: string;
}

/**
 * Renders layout for each page. Also passes along the title to the Header component.
 * @function Layout
 * @param {ReactNode} children - Children to be rendered by Layout component
 * @param {TTitle} title - Title for the page. Is set in <title>{title}</title>
 * @returns {JSX.Element} - Rendered component
 */

const Layout = ({ children, title }: ILayoutProps): JSX.Element => {
  const { setCart } = useContext(CartContext);
  const isMobile = useIsMobile();

  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);

      if (!updatedCart && !data?.cart?.contents?.nodes.length) {
        // Should we clear the localStorage if we have no remote cart?
        return;
      }

      localStorage.setItem('woocommerce-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header title={title} />
      {title !== 'Home' && <PageTitle title={title} />}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl mb-16">
        {children}
      </main>
      {isMobile && <BottomNav />}
    </div>
  );
};

export default Layout;
