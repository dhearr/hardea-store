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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
      <div className="fixed inset-0 bg-black opacity-75"></div>
      <div className="relative z-50 bg-white w-2/6 p-8 rounded-lg" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
