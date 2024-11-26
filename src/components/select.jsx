export default function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  className = '',
  labelname,
  ...props
}) {
  return (
    <div className="input-controller">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`input-select ${className}`}
        {...props}
      >
        <option value="" disabled={true}>{labelname}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
