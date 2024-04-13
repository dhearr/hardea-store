import ProductsView from "@/components/views/products";
import productsServices from "@/services/products";
import Head from "next/head";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const { data } = await productsServices.getAllProducts();
    setProducts(data.data);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductsView products={products} />
    </>
  );
};

export default ProductsPage;
