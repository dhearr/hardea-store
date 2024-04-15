import { useEffect, useRef } from "react";

type PropTypes = {
  children: React.ReactNode;
  onClose: any;
};

const Modal = (props: PropTypes) => {
  const { children, onClose } = props;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none">
      <div className="fixed inset-0 bg-black opacity-75"></div>
      <div
        className="relative z-50 max-h-[80vh] w-[50vw] overflow-y-auto rounded-lg bg-white p-8"
        ref={ref}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
