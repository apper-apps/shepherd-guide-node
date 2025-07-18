import React from "react";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className, 
  disabled,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary-500/25 active:scale-95",
    secondary: "bg-white text-surface-700 border border-surface-300 hover:bg-surface-50 hover:border-surface-400 active:scale-95",
    accent: "bg-gradient-accent text-white hover:shadow-lg hover:shadow-accent-500/25 active:scale-95",
    ghost: "text-surface-700 hover:bg-surface-100 active:scale-95",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-500/25 active:scale-95"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;