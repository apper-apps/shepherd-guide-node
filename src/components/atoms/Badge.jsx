import React from "react";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  variant = "default", 
  className, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-surface-100 text-surface-700",
    primary: "bg-primary-100 text-primary-700",
    accent: "bg-accent-100 text-accent-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;