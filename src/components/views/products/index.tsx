import ProductLayout from "@/components/layouts/ProductLayout";
import { Product } from "@/types/product.type";
import Card from "./Card";
import Link from "next/link";

type PropTypes = {
  products: Product[];
};

const ProductView = (props: PropTypes) => {
  const { products } = props;

  return (
    <ProductLayout products={products.map((product) => product.category)}>
      <div>
        <div className="grid grid-cols-3 gap-x-4 gap-y-8">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </ProductLayout>
  );
};

export default ProductView;
