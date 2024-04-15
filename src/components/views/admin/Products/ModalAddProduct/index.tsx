import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputFile from "@/components/ui/InputFile";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { Product } from "@/types/product.type";
import { Dispatch, SetStateAction, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

type PropTypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ModalAddProduct = (props: PropTypes) => {
  const { setModalAddProduct, setProductsData, setToaster } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };

  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1 className="mb-4 text-3xl font-bold">Add product</h1>
      <form onSubmit={() => {}} className="flex flex-col gap-4">
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert Product Name"
        />
        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="Insert Product Price"
        />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Realeased", value: "true" },
            { label: "Not Realeased", value: "false" },
          ]}
        />
        <div className="flex w-full items-center justify-between">
          <label htmlFor="stock" className="text-xl font-bold">
            Stock
          </label>
          <Button
            type="button"
            variant="p-2 font-bold rounded-md text-black text-2xl"
            onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
          >
            <FiPlusCircle />
          </Button>
        </div>
        {stockCount.map((item: { size: string; qty: number }, i: number) => (
          <div className="flex w-full gap-x-4 gap-y-4" key={i}>
            <div className="w-full">
              <Input
                label="Size"
                name="size"
                type="text"
                placeholder="Insert Size"
                onChange={(e) => {
                  handleStock(e, i, "size");
                }}
              />
            </div>
            <div className="w-full">
              <Input
                label="QTY"
                name="qty"
                type="number"
                placeholder="Insert Quantity"
                onChange={(e) => {
                  handleStock(e, i, "qty");
                }}
              />
            </div>
          </div>
        ))}
        <label htmlFor="image" className="text-xl font-bold">
          Image
        </label>
        <div className="w-full cursor-pointer rounded-md bg-gray-200 p-10 text-center text-xs transition duration-200 hover:bg-gray-200/80">
          <InputFile
            name="image"
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        </div>
        <Button
          type="submit"
          variant="p-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalAddProduct;
