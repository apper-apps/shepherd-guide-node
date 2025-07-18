import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Empty = ({ 
  icon = "FileText",
  title = "No data found",
  description = "There's nothing here yet. Get started by creating your first item.",
  action,
  onAction,
  className 
}) => {
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} size={32} className="text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-surface-900 mb-2">{title}</h3>
        
        <p className="text-surface-600 mb-6">{description}</p>
        
        {action && onAction && (
          <Button variant="primary" onClick={onAction}>
            <ApperIcon name="Plus" size={16} />
            <span className="ml-2">{action}</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Empty;