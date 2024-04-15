type Option = {
  label: string;
  value: string;
};

type PropTypes = {
  label?: React.ReactNode;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[];
};

const Select = (props: PropTypes) => {
  const { label, name, options, defaultValue, disabled } = props;

  return (
    <div>
      <label
        htmlFor={name}
        className="input input-bordered flex items-center gap-2 bg-slate-50 text-black/70"
      >
        {label && <span className="ml-1">{label}</span>}

        <select
          id={name}
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className="grow bg-slate-50"
        >
          {options.map((option) => (
            <option key={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Select;
