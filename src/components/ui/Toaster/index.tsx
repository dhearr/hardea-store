import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import {
  IoIosCloseCircle,
  IoIosWarning,
  IoMdCheckmarkCircle,
} from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { styles } from "./Toaster.module";

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
    <div className={styles.toaster}>
      <div
        className={`${styles.toaster__icon} ${ToasterVariant[variant].barColor} ${ToasterVariant[variant].iconColor}`}
      >
        {ToasterVariant[variant].icon}
      </div>
      <div className={styles.toaster__main}>
        <p className={styles.toaster__main__title}>
          {ToasterVariant[variant].title}
        </p>
        <p className={styles.toaster__main__title__message}>{message}</p>
      </div>
      <button
        type="button"
        className={styles.toaster__close}
        onClick={() => setToaster({})}
      >
        <IoClose />
      </button>
      <div className={`${styles.bar} ${ToasterVariant[variant].bgBarColor}`}>
        <div
          className={`${styles.bar__main} ${ToasterVariant[variant].barColor}`}
          style={{ width: `${lengthBar}%` }}
        />
      </div>
    </div>
  );
};

export default Toaster;
