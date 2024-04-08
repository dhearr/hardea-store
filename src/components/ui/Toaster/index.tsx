import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  IoIosCloseCircle,
  IoIosWarning,
  IoMdCheckmarkCircle,
} from "react-icons/io";
import { IoClose } from "react-icons/io5";

type PropTypes = {
  variant: string;
  message?: string;
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ToasterVariant: any = {
  success: {
    title: "Success",
    icon: <IoMdCheckmarkCircle />,
    iconColor: "text-[#a3d9a5]",
    bgBarColor: "bg-[#a3d9a5]",
    barColor: "bg-[#3f9242]",
  },
  danger: {
    title: "Error",
    icon: <IoIosCloseCircle />,
    iconColor: "text-[#f39b9a]",
    bgBarColor: "bg-[#f39b9a]",
    barColor: "bg-[#bb2525]",
  },
  warning: {
    title: "Warning",
    icon: <IoIosWarning />,
    iconColor: "text-[#f8e3a2]",
    bgBarColor: "bg-[#f8e3a2]",
    barColor: "bg-[#e9b949]",
  },
};

const Toaster = (props: PropTypes) => {
  const { variant, message, setToaster } = props;
  const [lengthBar, setLengthBar] = useState(100);
  const timerRef = useRef<any>(null);

  const timerStart = () => {
    timerRef.current = setInterval(() => {
      setLengthBar((prevLength) => prevLength - 0.15);
    }, 1);
  };

  useEffect(() => {
    timerStart();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="fixed z-[9999] bottom-0 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs p-4 mb-4 bg-white rounded-md shadow-lg overflow-hidden">
      <div
        className={`inline-flex items-center text-[24px] justify-center flex-shrink-0 w-8 h-8 ${ToasterVariant[variant].barColor} ${ToasterVariant[variant].iconColor} rounded-md`}
      >
        {ToasterVariant[variant].icon}
      </div>
      <div className="ms-3 max-w-xs">
        <p className="text-md font-bold">{ToasterVariant[variant].title}</p>
        <p className="text-sm font-normal">{message}</p>
      </div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 p-1.5"
        onClick={() => setToaster({})}
      >
        <IoClose />
      </button>
      <div
        className={`absolute w-full h-1.5 ${ToasterVariant[variant].bgBarColor} bottom-0 left-0`}
      >
        <div
          className={`h-1.5 ${ToasterVariant[variant].barColor}`}
          style={{ width: `${lengthBar}%` }}
        />
      </div>
    </div>
  );
};

export default Toaster;
