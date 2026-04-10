import "./Button.scss";

export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
