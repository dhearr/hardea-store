import { useEffect, useRef } from "react";
import { styles } from "./Modal.module";

type PropTypes = {
  children: React.ReactNode;
  variant?: string;
  onClose: any;
};

const Modal = (props: PropTypes) => {
  const { children, onClose, variant = "w-[50vw]" } = props;
  const ref: any = useRef();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.modal}>
      <div className={styles.modal__background}></div>
      <div
        className={`${styles.modal__main} ${variant}`}
        ref={ref}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
