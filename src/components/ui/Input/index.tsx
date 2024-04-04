type PropTypes = {
  label?: React.ReactNode;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  variant?: string;
};

const Input = (props: PropTypes) => {
  const {
    label,
    name,
    type,
    placeholder,
    required,
    defaultValue,
    disabled,
    variant = "bg-slate-50",
  } = props;

  return (
    <div>
      <label
        className={`input input-bordered ${variant} text-black/70 flex items-center gap-2`}
      >
        {label && <span>{label}</span>}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          disabled={disabled}
          className="grow disabled:opacity-50"
        />
      </label>
    </div>
  );
};

export default Input;
