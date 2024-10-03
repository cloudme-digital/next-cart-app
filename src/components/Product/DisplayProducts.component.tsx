/*eslint complexity: ["error", 20]*/
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { paddedPrice } from '@/utils/functions/functions';

interface Image {
  __typename: string;
  sourceUrl?: string;
}

interface Node {
  __typename: string;
  price: string;
  regularPrice: string;
  salePrice?: string;
}

interface Variations {
  __typename: string;
  nodes: Node[];
}

interface RootObject {
  __typename: string;
  databaseId: number;
  name: string;
  onSale: boolean;
  slug: string;
  image: Image;
  price: string;
  regularPrice: string;
  salePrice?: string;
  variations: Variations;
}

interface IDisplayProductsProps {
  products: RootObject[];
}

/**
 * Displays all of the products as long as length is defined.
 * Does a map() over the props array and utilizes uuidv4 for unique key values.
 * @function DisplayProducts
 * @param {IDisplayProductsProps} products Products to render
 * @returns {JSX.Element} - Rendered component
 */

const DisplayProducts = ({ products }: IDisplayProductsProps): JSX.Element => (
  <section className="container mx-auto px-4">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products ? (
        products.map(({ databaseId, name, price, onSale, slug, image }) => (
          <Link
            key={uuidv4()}
            href={`/product/${encodeURIComponent(slug)}?id=${encodeURIComponent(databaseId)}`}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={image?.sourceUrl || '/images/placeholder.png'}
                alt={name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 truncate">{name}</h2>
                <p className="text-gray-600">{paddedPrice(price)}</p>
                {onSale && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full mt-2 inline-block">
                    Sale
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No products found
        </div>
      )}
    </div>
  </section>
);

export default DisplayProducts;
