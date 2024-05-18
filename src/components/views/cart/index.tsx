import Button from "@/components/ui/Button";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";
import { Fragment } from "react";
import { GoTrash } from "react-icons/go";
import { MdFavoriteBorder } from "react-icons/md";

type PropTypes = {
  cart: any;
  products: Product[];
};

const CartView = (props: PropTypes) => {
  const { cart, products } = props;
  // console.log(cart);
  // console.log(products);

  const getProduct = (id: string) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const getOptionsSize = (id: string, selected: string) => {
    const product = products.find((product) => product.id === id);
    const options = product?.stock.map(
      (stock: { size: string; qty: number }) => {
        if (stock.qty > 0) {
          return (
            <option
              key={stock.size}
              value={stock.size}
              selected={stock.size === selected}
            >
              {stock.size}
            </option>
          );
        }
      },
    );
    const result = options?.filter((item) => item !== undefined);
    return result;
  };

  const getTotalPrice = () => {
    const total = cart.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return (acc += parseInt(product?.price) * item.qty);
      },
      0,
    );
    return total;
  };

  return (
    <div className="flex gap-8 px-[10vw] py-[12vh]">
      <div className="w-[65%]">
        <h1 className="text-2xl font-bold">Cart</h1>
        {cart.map((item: { id: string; size: string; qty: number }) => (
          <Fragment key={`${item.id}-${item.size}`}>
            <div className="mb-12 mt-6 flex">
              <Image
                src={`${getProduct(item.id)?.image}`}
                width={170}
                height={170}
                alt={`${item.id}-${item.size}`}
              />
              <div className="ml-4 w-full">
                <h1 className="text-lg font-medium">
                  {getProduct(item.id)?.name}
                </h1>
                <p className="text-lg text-black/50">
                  {getProduct(item.id)?.category}
                </p>
                <div className="mt-2 flex gap-4">
                  <div className="flex">
                    <label htmlFor="size" className="text-lg text-black/50">
                      Size
                    </label>
                    <div className="flex w-[70px] justify-center">
                      <select
                        name="size"
                        className="ml-1 w-full rounded-md px-2"
                      >
                        {getOptionsSize(item.id, item.size)}
                      </select>
                    </div>
                  </div>
                  <div className="flex">
                    <label htmlFor="size" className="text-lg text-black/50">
                      Quantity
                    </label>
                    <div className="flex w-[70px] justify-center">
                      <input
                        type="number"
                        name="qty"
                        defaultValue={item.qty}
                        className="ml-1 w-full rounded-md bg-[#EFEFEF] px-2 text-center"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-[53px] flex gap-5">
                  <Button variant="bg-transparent" type="button">
                    <MdFavoriteBorder className="text-2xl text-black" />
                  </Button>
                  <Button variant="bg-transparent" type="button">
                    <GoTrash className="text-2xl text-black" />
                  </Button>
                </div>
              </div>
              <h4 className="text-lg font-medium">
                {convertIDR(getProduct(item.id)?.price)}
              </h4>
            </div>
            <hr />
          </Fragment>
        ))}
      </div>
      <div className="w-[35%]">
        <h1 className="text-2xl font-bold">Summary</h1>
        <div className="mt-6 flex w-full justify-between">
          <h4 className="text-lg font-medium">Subtotal</h4>
          <h4 className="text-lg font-medium tracking-wider">
            {convertIDR(getTotalPrice())}
          </h4>
        </div>
        <div className="mt-4 flex w-full justify-between">
          <h4 className="text-lg font-medium">Estimated Delivery & Handling</h4>
          <h4 className="text-lg font-medium tracking-wider">Free</h4>
        </div>
        <div className="mt-4 flex w-full justify-between">
          <h4 className="text-lg font-medium">Estimated Duties and Taxes</h4>
          <h4 className="text-lg font-medium tracking-wider">-</h4>
        </div>
        <div className="mt-6 flex w-full justify-between border-b-2 border-t-2 py-5">
          <h4 className="text-lg font-medium">Total</h4>
          <h4 className="text-lg font-medium tracking-wider">
            {convertIDR(getTotalPrice())}
          </h4>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            variant="bg-black px-10 py-6 rounded-full text-white font-semibold w-full"
            type="button"
          >
            Guest Checkout
          </Button>
          <Button
            variant="bg-black px-10 py-6 rounded-full text-white font-semibold w-full"
            type="button"
          >
            Member Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartView;
