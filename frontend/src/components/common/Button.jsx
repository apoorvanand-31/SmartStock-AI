function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",
    danger:
      "bg-red-600 hover:bg-red-700 text-white",
    success:
      "bg-green-600 hover:bg-green-700 text-white",
    secondary:
      "bg-gray-500 hover:bg-gray-600 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;