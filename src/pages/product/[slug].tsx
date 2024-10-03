import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ApolloError } from '@apollo/client';
import SingleProduct from '@/components/Product/SingleProduct.component';
import Layout from '@/components/Layout/Layout.component';
import client from '@/utils/apollo/ApolloClient';
import { GET_SINGLE_PRODUCT } from '@/utils/gql/GQL_QUERIES';
import type { NextPage } from 'next';

const Product: NextPage = (): JSX.Element => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApolloError | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { data } = await client.query({
            query: GET_SINGLE_PRODUCT,
            variables: { id },
          });
          setProduct(data.product);
        } catch (err) {
          setError(err as ApolloError);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  return (
    <Layout title={product?.name || 'Product'}>
      {loading && (
        <div className="mt-8 text-2xl text-center">Loading product...</div>
      )}
      {error && (
        <div className="mt-8 text-2xl text-center">Error: {error.message}</div>
      )}
      {product && <SingleProduct product={product} />}
    </Layout>
  );
};

export default Product;

// Remove getServerSideProps
