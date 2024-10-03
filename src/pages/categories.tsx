import { useState, useEffect } from 'react';
import { ApolloError } from '@apollo/client';
import DisplayCategories from '@/components/Category/DisplayCategories.component';
import Layout from '@/components/Layout/Layout.component';
import client from '@/utils/apollo/ApolloClient';
import { FETCH_ALL_CATEGORIES_QUERY } from '@/utils/gql/GQL_QUERIES';
import type { NextPage } from 'next';

const Categories: NextPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApolloError | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await client.query({
          query: FETCH_ALL_CATEGORIES_QUERY,
        });
        setCategories(data.productCategories.nodes);
      } catch (err) {
        setError(err as ApolloError);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Layout title="Categories">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {categories && <DisplayCategories categories={categories} />}
    </Layout>
  );
};

export default Categories;
// Remove getStaticProps
