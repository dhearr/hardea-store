import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import { Product } from "@/types/product.type";

type PropTypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProductsAdminView = (props: PropTypes) => {
  const { products, setToaster } = props;
  const [productsData, setProductsData] = useState<Product[]>([]);

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
                      className="px-6 py-4 font-medium text-white"
                    >
                      {index + 1}.
                    </td>
                    <td rowSpan={product.stock.length} className="px-6 py-4">
                      <div className="flex justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={50}
                          height={50}
                        />
                      </div>
                    </td>
                    <td rowSpan={product.stock.length} className="px-6 py-4">
                      {product.name}
                    </td>
                    <td rowSpan={product.stock.length} className="px-6 py-4">
                      {product.category}
                    </td>
                    <td rowSpan={product.stock.length} className="px-6 py-4">
                      {convertIDR(product.price)}
                    </td>
                    <td className="px-6 py-4">{product.stock[0].size}</td>
                    <td className="px-6 py-4">{product.stock[0].qty}</td>
                    <td rowSpan={product.stock.length} className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          type="button"
                          variant="bg-red-800 text-sm p-2 rounded-md"
                        >
                          <FaTrash />
                        </Button>
                        <Button
                          type="button"
                          variant="bg-blue-800 text-sm p-2 rounded-md"
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
                          <tr key={stock.size} className="bg-[#000000]">
                            <td className="px-6 py-4">{stock.size}</td>
                            <td className="px-6 py-4">{stock.qty}</td>
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
    </>
  );
};

export default ProductsAdminView;
