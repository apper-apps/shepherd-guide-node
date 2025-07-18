import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  className 
}) => {
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="AlertCircle" size={32} className="text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-surface-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-surface-600 mb-6">{message}</p>
        
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            <ApperIcon name="RefreshCw" size={16} />
            <span className="ml-2">Try Again</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Error;