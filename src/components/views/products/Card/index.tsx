import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type PropTypes = {
  product: Product;
};

const Card = (props: PropTypes) => {
  const { product } = props;

  return (
    <div className="card h-96 max-w-xl">
      <Image src={product.image} alt={product.name} width={500} height={500} />
      <div className="px-1 py-2">
        <h2 className="mt-2 font-semibold text-[#111111]">{product.name}</h2>
        <div className="font-semobold mb-5 text-[#626262]">
          {product.category}
        </div>
        <h3 className="mb-3 font-semibold text-[#111111]">
          {convertIDR(product.price)}
        </h3>
      </div>
    </div>
  );
};

export default Card;
