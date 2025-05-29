import React from "react";

/**
 * Reusable Button component.
 * @param {object} props - Component props.
 * @param {function} props.onClick - Function to call when the button is clicked.
 * @param {React.ReactNode} props.children - The content to display inside the button.
 */
const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
    >
      {children}
    </button>
  );
};

export default Button;
