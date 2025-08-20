import React from "react";
import { cn } from "@/app/lib/utils";

interface InputProps {
  type: string;
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  hasError?: boolean;
  label?: string;
}

export const Input = ({
  type,
  error,
  onChange,
  value,
  placeholder,
  className,
  inputClassName,
  hasError,
  label
}: InputProps) => {
  return (
    <div className={cn("", className)}>
      <p className="mb-1 text-sm font-medium">{label}</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black w-full",
          inputClassName,
          error || hasError ? "border-red-500" : ""
        )}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
