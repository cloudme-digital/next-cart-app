import Head from 'next/head';

import Navbar from './Navbar.component';

interface IHeaderProps {
  title: string;
}

/**
 * Renders header for each page.
 * @function Header
 * @param {string} title - Title for the page. Is set in <title>{title}</title>
 * @returns {JSX.Element} - Rendered component
 */

const Header = ({ title }: IHeaderProps): JSX.Element => (
  <>
    <Head>
      <title>{title} — Shopping Cart App</title>
      <meta name="description" content="E-commerce Shopping Store" />
      <meta name="keywords" content="E-commerce, Shopping, Store" />
      <meta
        property="og:title"
        content="E-commerce Shopping Store"
        key="pagetitle"
      />
    </Head>
    <Navbar />
  </>
);

export default Header;
