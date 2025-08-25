import React from "react";
import { cn } from "@/app/lib/utils";

// extend native input props so onKeyDown, onBlur, etc. are allowed
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | null;
  hasError?: boolean;
  label?: string;
  inputClassName?: string;
}

export const Input = ({
  type,
  error,
  value,
  placeholder,
  className,
  inputClassName,
  hasError,
  label,
  ...props // ✅ catches onChange, onKeyDown, etc.
}: InputProps) => {
  return (
    <div className={cn("", className)}>
       <p className="mb-1 text-sm font-medium text-gray-500">{label}</p>
       <input
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={props.readOnly}
        className={cn(
          "border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black w-full",
          inputClassName,
          error || hasError ? "border-red-500" : "",
          props.readOnly ? "bg-gray-200 cursor-not-allowed" : ""
        )}
        {...props} // ✅ spread remaining props (onChange, onKeyDown, etc.)
       />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
