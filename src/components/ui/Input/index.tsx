type PropTypes = {
  label?: React.ReactNode;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
};

const Input = (props: PropTypes) => {
  const { label, name, type, placeholder, required } = props;

  return (
    <div>
      <label className="input input-bordered bg-slate-50 text-black/70 flex items-center gap-2">
        {label && <span>{label}</span>}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className="grow placeholder:text-black/70"
        />
      </label>
    </div>
  );
};

export default Input;
