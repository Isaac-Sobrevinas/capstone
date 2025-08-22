import React from "react";
import { cn } from "@/app/lib/utils";

interface ButtonProps {
    variant?: "default" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "xs";
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

export const Button = ({
    variant = "default",
    size = "xs",
    onClick,
    disabled,
    className,
    children
}: ButtonProps) => {
    return (
        <button
            className={cn(
                "px-4 py-2 focus:outline-none cursor-pointer hover:opacity-80",
                {
                    "bg-black text-white": variant === "default",
                    "border border-black text-black": variant === "outline",
                    "bg-transparent text-black": variant === "ghost",
                    "text-xs" : size === "xs",
                    "text-sm": size === "sm",
                    "text-lg": size === "lg"
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
