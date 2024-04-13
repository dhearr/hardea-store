import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type PropTypes = {
  product: Product;
  key: string;
};

const Card = (props: PropTypes) => {
  const { product, key } = props;

  return (
    <div
      key={key}
      className="card h-96 max-w-xl rounded-md bg-[#000000] shadow-xl"
    >
      <figure>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-white">{product.name}</h2>
        <div className="badge badge-outline badge-sm rounded-md text-white">
          {product.category}
        </div>
        <h3 className="mt-3 text-white">{convertIDR(product.price)}</h3>
      </div>
    </div>
  );
};

export default Card;
