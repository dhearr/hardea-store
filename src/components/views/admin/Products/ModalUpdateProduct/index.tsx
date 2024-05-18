import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import InputFile from "@/components/ui/InputFile";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { uploadFile } from "@/lib/firebase/service";
import productsServices from "@/services/products";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

type PropTypes = {
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ModalUpdateProduct = (props: PropTypes) => {
  const { updatedProduct, setUpdatedProduct, setProductsData, setToaster } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState(updatedProduct.stock);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };

  const updateProduct = async (
    form: any,
    newImageURL: string = updatedProduct.image,
  ) => {
    const stock = stockCount.map((stock: { size: string; qty: number }) => {
      return { size: stock.size, qty: parseInt(`${stock.qty}`) };
    });
    const data = {
      name: form.name.value,
      price: parseInt(form.price.value),
      category: form.category.value,
      status: form.status.value,
      stock: stock,
      image: newImageURL,
    };
    const result = await productsServices.updateProduct(
      updatedProduct.id,
      data,
      session.data?.accessToken,
    );
    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedProduct(false);
      const { data } = await productsServices.getAllProducts();
      setProductsData(data.data);
      setToaster({
        variant: "success",
        message: "Product update successfully",
      });
    } else {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed to update product",
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      const newName = "main." + file.name.split(".")[1];
      uploadFile(
        updatedProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            updateProduct(form, newImageURL);
          } else {
            setIsLoading(false);
            setToaster({
              variant: "danger",
              message: "Failed to add product",
            });
          }
        },
      );
    } else {
      updateProduct(form);
    }
  };

  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1 className="mb-4 text-2xl font-bold">Update product</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <Input
          name="name"
          type="text"
          placeholder="Insert Product Name"
          defaultValue={updatedProduct?.name}
        />
        <label htmlFor="price" className="text-sm">
          Price
        </label>
        <Input
          name="price"
          type="number"
          placeholder="Insert Product Price"
          defaultValue={updatedProduct?.price}
        />
        <label htmlFor="category" className="text-sm">
          Category
        </label>
        <Select
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
          defaultValue={updatedProduct?.category}
        />
        <label htmlFor="status" className="text-sm">
          Status
        </label>
        <Select
          name="status"
          options={[
            { label: "Realeased", value: "true" },
            { label: "Not Realeased", value: "false" },
          ]}
          defaultValue={updatedProduct?.status}
        />
        <label htmlFor="image" className="my-4 text-lg font-bold">
          Image
        </label>
        <div className="mb-5 flex h-auto w-full items-center justify-center gap-4">
          <Image
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct?.image
            }
            alt="product image"
            width={200}
            height={200}
            className="h-full w-36 rounded-md"
          />
          <div className="flex h-36 w-full cursor-pointer items-center justify-center rounded-md bg-gray-200 p-10 text-center text-xs transition duration-200 hover:bg-gray-200/80">
            <InputFile
              name="image"
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          </div>
        </div>
        <label htmlFor="stock" className="mb-4 text-lg font-bold">
          Stock
        </label>
        {stockCount.map((item: { size: string; qty: number }, i: number) => (
          <div className="flex w-full justify-between gap-y-4" key={i}>
            <div className="w-[45%]">
              <label htmlFor="size" className="text-sm">
                Size
              </label>
              <Input
                name="size"
                type="text"
                placeholder="Insert Size"
                onChange={(e) => {
                  handleStock(e, i, "size");
                }}
                defaultValue={item.size}
              />
            </div>
            <div className="w-[45%]">
              <label htmlFor="qty" className="text-sm">
                Quantity
              </label>
              <Input
                name="qty"
                type="number"
                placeholder="Insert Quantity"
                onChange={(e) => {
                  handleStock(e, i, "qty");
                }}
                defaultValue={item.qty}
              />
            </div>
          </div>
        ))}
        <div className="mb-8 flex w-full items-center justify-center">
          <Button
            type="button"
            variant="block p-2 font-bold rounded-md text-black/60 text-2xl"
            onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
          >
            <FiPlusCircle />
          </Button>
        </div>
        <Button
          type="submit"
          variant="p-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Update Product"
          )}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
