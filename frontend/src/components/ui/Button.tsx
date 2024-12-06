import React, { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  childern?: ReactNode;
  className?: string;
}

const variants = {
  primary: "bg-indigo-700 text-white hover:bg-indigo-800",
  secondary: "bg-indigo-200 text-indigo-600 hover:bg-indigo-300",
};

const sizes = {
  sm: "px-2 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-2 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        flex items-center justify-center gap-2 rounded-lg
        transition-colors duration-300 ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
