export default function InputField(
  { label, name, value, onChange, placeholder, required }) {
  return (
  <div className="input-controller">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="input-text"
    />
  </div>
)};