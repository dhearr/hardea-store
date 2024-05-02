import { styles } from "./Select.module";

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
    <div className={styles.container}>
      <label htmlFor={name} className={styles.container__label}>
        {label && (
          <span className={styles.container__label__icon}>{label}</span>
        )}

        <select
          id={name}
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className={styles.container__label__icon__select}
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
