import { useId, ForwardedRef, forwardRef, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  className?: string;
}

const Select = (
  { label, options, className = "", ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) => {
  const id = useId();

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block font-semibold mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-colors duration-300 [&>option]:bg-gray-800 [&>option]:text-white ${className}`}
        id={id}
        ref={ref}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default forwardRef<HTMLSelectElement, SelectProps>(Select);
