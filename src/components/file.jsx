export default function FileInputField({
  label,
  name,
  onChange,
  required = false,
  className = '',
  filename,
  ...props
}) {
  return (
    <div className="input-controller">
      <label htmlFor={name} className="label-input">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="file"
        onChange={onChange}
        required={required}
        className={`input-file ${className}`}
        {...props}
      />
      {filename}
    </div>
  );
};

