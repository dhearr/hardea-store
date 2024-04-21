import DetailProductView from "@/components/views/detailProduct";
import productsServices from "@/services/products";
import { Product } from "@/types/product.type";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProductDetailPage = () => {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product | {}>({});

  const getDetailProduct = async (id: string) => {
    const { data } = await productsServices.getDetailProduct(id);
    setProduct(data.data);
  };

  useEffect(() => {
    getDetailProduct(id as string);
  }, [id]);

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <DetailProductView product={product} />
    </>
  );
};

export default ProductDetailPage;
