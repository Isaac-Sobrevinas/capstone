import React from "react";
import { cn } from "@/app/lib/utils";

interface ButtonProps {
    variant?: "default" | "outline" | "ghost";
    size?: "small" | "medium" | "large";
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const Button = ({
    variant = "default",
    size = "medium",
    onClick,
    disabled,
    className,
    children
}: ButtonProps) => {
    return (
        <button
            className={cn(
                "px-4 py-2 rounded-md focus:outline-none",
                {
                    "bg-black text-white": variant === "default",
                    "border border-black text-black": variant === "outline",
                    "bg-transparent text-black": variant === "ghost",
                    "text-sm": size === "small",
                    "text-lg": size === "large"
                },
                className
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
