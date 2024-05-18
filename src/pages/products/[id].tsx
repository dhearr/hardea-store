import DetailProductView from "@/components/views/detailProduct";
import productsServices from "@/services/products";
import usersServices from "@/services/users";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProductDetailPage = (props: PropTypes) => {
  const { setToaster } = props;
  const { id } = useRouter().query;
  const session: any = useSession();
  const [product, setProduct] = useState<Product | {}>({});
  const [cart, setCart] = useState([]);
  console.log(cart);

  const getDetailProduct = async (id: string) => {
    const { data } = await productsServices.getDetailProduct(id);
    setProduct(data.data);
  };

  const getCart = async (token: string) => {
    const { data } = await usersServices.getCart(token);
    setCart(data.data);
  };

  useEffect(() => {
    getDetailProduct(id as string);
  }, [id]);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <DetailProductView
        product={product}
        cart={cart}
        productId={id}
        setToaster={setToaster}
      />
    </>
  );
};

export default ProductDetailPage;
