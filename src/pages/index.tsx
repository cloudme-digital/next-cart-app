import { useState, useEffect } from 'react';
import { ApolloError } from '@apollo/client';
import Hero from '@/components/Index/Hero.component';
import DisplayProducts from '@/components/Product/DisplayProducts.component';
import Layout from '@/components/Layout/Layout.component';
import client from '@/utils/apollo/ApolloClient';
import { FETCH_ALL_PRODUCTS_QUERY } from '@/utils/gql/GQL_QUERIES';
import type { NextPage } from 'next';

/**
 * Main index page
 * @function Index
 * @param {InferGetStaticPropsType<typeof getStaticProps>} products
 * @returns {JSX.Element} - Rendered component
 */

const Index: NextPage = (): JSX.Element => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApolloError | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await client.query({
          query: FETCH_ALL_PRODUCTS_QUERY,
        });
        setProducts(data.products.nodes);
      } catch (err) {
        setError(err as ApolloError);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout title="Home">
      <Hero />
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {products && <DisplayProducts products={products} />}
    </Layout>
  );
};

export default Index;

// Remove getStaticProps
