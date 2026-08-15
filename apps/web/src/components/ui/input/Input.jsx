import "./Input.css";

function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  autoComplete,
  disabled = false,
}) {
  return (
    <input
      className="input"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      disabled={disabled}
    />
  );
}

export default Input;
