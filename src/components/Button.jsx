"use client";

export function Button({ children, className, type, onClick }) {
  return (
    <button
      onClick={onClick ?? undefined}
      type={type ?? undefined}
      className={`font-bold py-2 px-5 rounded transition ease-in-out ${className}`}
    >
      {children}
    </button>
  );
}
