import ProductLayout from "@/components/layouts/ProductLayout";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import Card from "./Card";

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
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </ProductLayout>
  );
};

export default ProductView;
