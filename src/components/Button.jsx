"use client";

export function Button({
  children,
  className = undefined,
  type = undefined,
  onClick = undefined,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`font-bold py-2 px-5 rounded transition ease-in-out ${className}`}
    >
      {children}
    </button>
  );
}
