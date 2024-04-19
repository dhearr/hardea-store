import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";
import ModalAddProduct from "./ModalAddProduct";
import ModalUpdateProduct from "./ModalUpdateProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";

type PropTypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProductsAdminView = (props: PropTypes) => {
  const { products, setToaster } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({});
  const [deletedProduct, setDeletedProduct] = useState<Product | {}>({});

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  return (
    <>
      <AdminLayout>
        <div className="mb-5">
          <h1 className="text-2xl font-semibold text-white">
            Product Management
          </h1>
        </div>
        <div className="mb-5">
          <Button
            type="button"
            variant="bg-green-600 flex items-center px-2 py-1.5 rounded-md text-white hover:bg-green-700"
            onClick={() => setModalAddProduct(true)}
          >
            <span className="mr-2 inline-flex">
              <FaPlus />
            </span>
            Add Product
          </Button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-md">
          <table className="w-full text-center text-sm font-medium text-white">
            <thead className="border-b border-[#333333] bg-[#000000] text-xs uppercase text-white">
              <tr>
                <th rowSpan={2} className="px-6 py-5">
                  No
                </th>
                <th rowSpan={2} className="px-6 py-5">
                  Image
                </th>
                <th rowSpan={2} className="px-6 py-5">
                  Name
                </th>
                <th rowSpan={2} className="px-6 py-5">
                  Category
                </th>
                <th rowSpan={2} className="px-6 py-5">
                  Price
                </th>
                <th colSpan={2} className="px-6 py-5">
                  Stock
                </th>
                <th rowSpan={2} className="px-6 py-5">
                  Action
                </th>
              </tr>
              <tr>
                <th className="px-6 py-5">Size</th>
                <th className="px-6 py-5">Qty</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product: any, index: number) => (
                <>
                  <tr key={product.id} className="bg-[#000000]">
                    <td
                      rowSpan={product.stock.length}
                      className="border-b border-[#333333] px-6 py-4 font-medium text-white"
                    >
                      {index + 1}.
                    </td>
                    <td
                      rowSpan={product.stock.length}
                      className="border-b border-[#333333] px-6 py-4"
                    >
                      <div className="flex justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                        />
                      </div>
                    </td>
                    <td
                      rowSpan={product.stock.length}
                      className="border-b border-[#333333] px-6 py-4"
                    >
                      {product.name}
                    </td>
                    <td
                      rowSpan={product.stock.length}
                      className="border-b border-[#333333] px-6 py-4"
                    >
                      {product.category}
                    </td>
                    <td
                      rowSpan={product.stock.length}
                      className="border-b border-[#333333] px-6 py-4"
                    >
                      {convertIDR(product.price)}
                    </td>
                    <td
                      className={`${product.stock.length === 1 ? "border-b border-[#333333]" : ""} x-6 py-4`}
                    >
                      {product.stock[0].size}
                    </td>
                    <td
                      className={`${product.stock.length === 1 ? "border-b border-[#333333]" : ""} x-6 py-4`}
                    >
                      {product.stock[0].qty}
                    </td>
                    <td
                      rowSpan={product.stock.length}
                      className="border-b border-[#333333] px-6 py-4"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          type="button"
                          variant="bg-red-800 text-sm p-2 rounded-md"
                          onClick={() => setDeletedProduct(product)}
                        >
                          <FaTrash />
                        </Button>
                        <Button
                          type="button"
                          variant="bg-blue-800 text-sm p-2 rounded-md"
                          onClick={() => setUpdatedProduct(product)}
                        >
                          <BiSolidEdit />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map(
                    (stock: { size: string; qty: number }, index: number) => (
                      <>
                        {index > 0 && (
                          <tr
                            key={stock.size}
                            className={`${index === product.stock.length - 1 ? "border-b border-[#333333] bg-[#000000]" : ""}`}
                          >
                            <td className="bg-[#000000] px-6 py-4">
                              {stock.size}
                            </td>
                            <td className="bg-[#000000] px-6 py-4">
                              {stock.qty}
                            </td>
                          </tr>
                        )}
                      </>
                    ),
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {modalAddProduct && (
        <ModalAddProduct
          setToaster={setToaster}
          setModalAddProduct={setModalAddProduct}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(updatedProduct).length > 0 && (
        <ModalUpdateProduct
          setToaster={setToaster}
          updatedProduct={updatedProduct}
          setUpdatedProduct={setUpdatedProduct}
          setProductsData={setProductsData}
        />
      )}
      {Object.keys(deletedProduct).length > 0 && (
        <ModalDeleteProduct
          setToaster={setToaster}
          deletedProduct={deletedProduct}
          setDeletedProduct={setDeletedProduct}
          setProductsData={setProductsData}
        />
      )}
    </>
  );
};

export default ProductsAdminView;
