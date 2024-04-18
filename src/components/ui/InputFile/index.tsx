import { Dispatch, SetStateAction } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

type PropTypes = {
  uploadedImage: File | null;
  name: string;
  setUploadedImage: Dispatch<SetStateAction<File | null>>;
};

const InputFile = (props: PropTypes) => {
  const { uploadedImage, name, setUploadedImage } = props;

  return (
    <>
      <label htmlFor={name} className="cursor-pointer">
        {uploadedImage?.name ? (
          <p className="font-semibold text-black">{uploadedImage.name}</p>
        ) : (
          <>
            <div className="mb-2 flex items-center justify-center">
              <h1 className="text-3xl text-black/70">
                <IoCloudUploadOutline />
              </h1>
            </div>
            <p className="text-black">
              Upload a new image, Larger image will be resized automatically.
            </p>
            <p className="font-semibold text-black">
              Maximum upload size is{" "}
              <span className="font-black text-blue-800">1 MB</span>
            </p>
          </>
        )}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className="absolute z-[-1] opacity-0"
        onChange={(e: any) => {
          e.preventDefault();
          setUploadedImage(e.currentTarget.files[0]);
        }}
      />
    </>
  );
};

export default InputFile;
