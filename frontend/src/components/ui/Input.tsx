import { useId, ForwardedRef, forwardRef, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input = (
  { label, type = "text", className = "", ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const id = useId();

  return (
    <div className=" mb-4">
      {label && (
        <label htmlFor={id} className="block font-semibold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-colors duration-300 ${className}`}
        id={id}
        ref={ref}
        {...props}
      />
    </div>
  );
};

export default forwardRef<HTMLInputElement, InputProps>(Input);
