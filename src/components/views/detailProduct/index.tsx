import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import styles from "./DetailProduct.module.scss";
import Button from "@/components/ui/Button";

type PropTypes = {
  product: Product | any;
};

const DetailProductView = (props: PropTypes) => {
  const { product } = props;

  return (
    <div className="flex gap-10 px-[20vw] py-[20vh]">
      <div className="w-1/2">
        <Image
          src={product?.image}
          alt={product?.name}
          width={500}
          height={500}
          className="h-auto w-full"
        />
      </div>
      <div className="w-1/2">
        <h1 className="text-xl font-medium">{product?.name}</h1>
        <p className="mb-2 text-lg font-medium">{product?.category}</p>
        <p className="text-lg font-medium">{convertIDR(product?.price)}</p>
        <p className="mt-5 text-sm font-medium">Select Size</p>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {product?.stock?.map((item: { size: string; qty: number }) => (
            <div className="flex" key={item.size}>
              <input
                type="radio"
                name="size"
                id={`size-${item.size}`}
                className={styles.input}
                disabled={item.qty === 0}
              />
              <label
                htmlFor={`size-${item.size}`}
                className={`${styles.label} flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-gray-300 p-2.5 font-medium hover:border-[#000000]`}
              >
                {item.size}
              </label>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="mt-5 w-full bg-black rounded-md p-4 text-white"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default DetailProductView;
