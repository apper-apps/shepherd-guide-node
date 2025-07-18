import React from "react";
import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-xl border border-surface-200 shadow-premium transition-all duration-200 hover:shadow-premium-lg",
        className
      )}
      {...props}
    />
  );
});

Card.displayName = "Card";

export default Card;