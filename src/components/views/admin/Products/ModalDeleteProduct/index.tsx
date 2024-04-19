import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import productsServices from "@/services/products";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { CgDanger } from "react-icons/cg";

type PropTypes = {
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteProduct = (props: PropTypes) => {
  const { deletedProduct, setDeletedProduct, setProductsData, setToaster } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession(); // Inisialisasi session

  const handleDeleteProduct = async () => {
    const result = await productsServices.deleteProduct(
      deletedProduct.id,
      session.data?.accessToken,
    ); // Menghapus user dari server

    // Mengecek status permintaan
    if (result.status === 200) {
      setIsLoading(false);
      setToaster({
        variant: "success",
        message: "Product deleted successfully",
      });
      setDeletedProduct({});
      const { data } = await productsServices.getAllProducts(); // Mengambil data users dari server
      setProductsData(data.data); // Menetapkan data users ke state
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed to delete product",
      });
    }
  };

  return (
    <Modal onClose={() => setDeletedProduct({})} variant="w-1/3">
      <h1 className="flex justify-center text-5xl">
        <CgDanger />
      </h1>
      <h1 className="text-center text-2xl">
        Are you sure you want to delete this product?
      </h1>
      <div className="flex justify-between gap-5">
        <Button
          type="button"
          onClick={() => handleDeleteProduct()}
          variant="w-full bg-red-600 hover:bg-red-500 text-white rounded-md p-2 mt-4"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Delete"
          )}
        </Button>
        <Button
          type="button"
          onClick={() => setDeletedProduct({})}
          variant="w-full bg-gray-600 hover:bg-gray-500 rounded-md p-2 text-white mt-4"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteProduct;
