import { IoIosCloseCircle, IoMdCheckmarkCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";

type PropTypes = {
  variant: string;
  message?: string;
};

const ToasterVariant: any = {
  success: {
    title: "Success",
    icon: <IoMdCheckmarkCircle />,
    color: "#a3d9a5",
    barColor: "#3f9242",
  },
  danger: {
    title: "Failed",
    icon: <IoIosCloseCircle />,
    color: "#f39b9a",
    barColor: "#bb2525",
  },
};

const Toaster = (props: PropTypes) => {
  const { variant = "danger", message } = props;
  // console.log(ToasterVariant[variant].color);

  return (
    <div className="fixed z-[9999] bottom-0 transform translate-x-20 flex items-center w-full max-w-xs p-4 mb-4 bg-white rounded-md shadow-lg overflow-hidden">
      <div
        className={`inline-flex items-center text-[24px] justify-center flex-shrink-0 w-8 h-8 bg-[${ToasterVariant[variant].barColor}] text-[${ToasterVariant[variant].color}] rounded-md`}
      >
        {ToasterVariant[variant].icon}
      </div>
      <div className="ms-3 max-w-xs">
        <p className="text-md font-bold">{ToasterVariant[variant].title}</p>
        <p className="text-sm font-normal">{message}</p>
      </div>
      <button type="button" className="ms-auto -mx-1.5 -my-1.5 p-1.5">
        <IoClose />
      </button>
      <div
        className={`absolute w-full h-1.5 bg-[${ToasterVariant[variant].color}] bottom-0 left-0`}
      >
        <div
          className={`w-[70%] h-1.5 bg-[${ToasterVariant[variant].barColor}]`}
        />
      </div>
    </div>
  );
};

export default Toaster;
