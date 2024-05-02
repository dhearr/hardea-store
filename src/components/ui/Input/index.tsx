import { styles } from "./Input.module";

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
    <div className={styles.container}>
      <label className={`${styles.container__label} ${variant}`}>
        {label && <span>{label}</span>}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          disabled={disabled}
          className={styles.container__label__input}
          onChange={onChange}
        />
        <span className={styles.container__label__input__toggle}>{toggle}</span>
      </label>
    </div>
  );
};

export default Input;
