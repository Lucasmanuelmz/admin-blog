export default function TextareaField(
  { label, name, value, onChange, placeholder, required }) {
  return(
  <div className="input-controller">
    <label htmlFor={name}>{label}</label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="input-textarea"
    ></textarea>
  </div>
)
};