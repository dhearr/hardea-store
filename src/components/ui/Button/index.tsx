type PropTypes = {
  type: "submit" | "button" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean | undefined;
  variant?: string;
};

const Button = (props: PropTypes) => {
  const { type, onClick, disabled, variant = "bg-black", children } = props;

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${variant} transition-all transform-gpu active:scale-[.98]`}
    >
      {children}
    </button>
  );
};

export default Button;
