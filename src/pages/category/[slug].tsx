import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ApolloError } from '@apollo/client';
import DisplayProducts from '@/components/Product/DisplayProducts.component';
import Layout from '@/components/Layout/Layout.component';
import client from '@/utils/apollo/ApolloClient';
import { GET_PRODUCTS_FROM_CATEGORY } from '@/utils/gql/GQL_QUERIES';
import type { NextPage } from 'next';

const Category: NextPage = (): JSX.Element => {
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApolloError | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchCategoryProducts = async () => {
        try {
          const { data } = await client.query({
            query: GET_PRODUCTS_FROM_CATEGORY,
            variables: { id },
          });
          setCategoryName(data.productCategory.name);
          setProducts(data.productCategory.products.nodes);
        } catch (err) {
          setError(err as ApolloError);
        } finally {
          setLoading(false);
        }
      };

      fetchCategoryProducts();
    }
  }, [id]);

  return (
    <Layout title={categoryName ? categoryName : ''}>
      {loading && (
        <div className="mt-8 text-2xl text-center">Loading product...</div>
      )}
      {error && (
        <div className="mt-8 text-2xl text-center">Error: {error.message}</div>
      )}
      {products && <DisplayProducts products={products} />}
    </Layout>
  );
};

export default Category;

// Remove getServerSideProps
