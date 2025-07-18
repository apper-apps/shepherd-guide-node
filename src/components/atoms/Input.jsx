import React from "react";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text", 
  className, 
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full px-3 py-2 border border-surface-300 rounded-lg bg-white text-surface-900 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;