type PropTypes = {
  label?: React.ReactNode;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number;
  disabled?: boolean;
  variant?: string;
  onChange?: (e: any) => void;
  toggle?: React.ReactNode;
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
    onChange,
    toggle,
  } = props;

  return (
    <div className="mb-4 mt-2">
      <label
        className={`input input-bordered ${variant} label:font-bold flex items-center gap-2 text-black/70`}
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
          onChange={onChange}
        />
        <span className="cursor-pointer">{toggle}</span>
      </label>
    </div>
  );
};

export default Input;
