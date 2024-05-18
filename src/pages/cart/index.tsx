import CartView from "@/components/views/cart";
import productsServices from "@/services/products";
import usersServices from "@/services/users";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const CartPage = (props: PropTypes) => {
  const { setToaster } = props;
  const session: any = useSession();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const getCart = async (token: string) => {
    const { data } = await usersServices.getCart(token);
    setCart(data.data);
  };

  const getAllProducts = async () => {
    const { data } = await productsServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <CartView cart={cart} products={products} />
    </>
  );
};

export default CartPage;
