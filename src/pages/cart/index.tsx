import CartView from "@/components/views/cart";
import Head from "next/head";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const CartPage = (props: PropTypes) => {
  const { setToaster } = props;

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <CartView />
    </>
  );
};

export default CartPage;
