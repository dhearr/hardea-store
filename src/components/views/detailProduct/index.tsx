import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import styles from "./DetailProduct.module.scss";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import usersServices from "@/services/users";

type PropTypes = {
  product: Product | any;
  cart: any;
  productId: string | string[] | undefined;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const DetailProductView = (props: PropTypes) => {
  const { product, cart = [], productId, setToaster } = props;
  const { status, data: session }: any = useSession();
  const router = useRouter();
  const [selectSize, setSelectSize] = useState("");

  const handleAddToCart = async () => {
    if (selectSize !== "") {
      let newCart = [];
      if (
        cart?.filter(
          (item: any) => item.id === productId && item.size === selectSize,
        ).length > 0
      ) {
        newCart = cart.map((item: any) => {
          if (item.id === productId && item.size === selectSize) {
            item.qty += 1;
          }
          return item;
        });
      } else {
        newCart = [
          ...cart,
          {
            id: productId,
            qty: 1,
            size: selectSize,
          },
        ];
      }
      try {
        const result = await usersServices.addToCart(
          {
            carts: newCart,
          },
          session?.accessToken,
        );
        if (result.status === 200) {
          setSelectSize("");
          setToaster({
            variant: "success",
            message: "Added to cart success",
          });
        }
      } catch (error) {
        setToaster({
          variant: "danger",
          message: "Failed to add to cart",
        });
      }
    }
  };

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
                onClick={() => setSelectSize(item.size)}
                checked={selectSize === item.size}
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
          type={status === "authenticated" ? "submit" : "button"}
          variant="mt-5 w-full bg-black rounded-md p-4 text-white"
          onClick={() => {
            status === "unauthenticated"
              ? router.push(`/auth/login?callbackUrl=${router.asPath}`)
              : handleAddToCart();
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default DetailProductView;
