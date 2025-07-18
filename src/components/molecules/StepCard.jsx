import React from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StepCard = ({ 
  step, 
  index, 
  isSelected, 
  onClick,
  onEdit,
  onDelete,
  className 
}) => {
  const getActionIcon = (action) => {
    switch (action) {
      case "click": return "MousePointer";
      case "type": return "Type";
      case "navigate": return "Navigation";
      case "scroll": return "ScrollText";
      default: return "Circle";
    }
  };

  return (
    <Card 
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:shadow-lg",
        isSelected && "ring-2 ring-primary-500",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold">
            {index + 1}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <ApperIcon name={getActionIcon(step.action)} size={16} className="text-primary-600" />
            <Badge variant="primary">{step.action}</Badge>
          </div>
          
          <h3 className="font-medium text-surface-900 mb-1">{step.description}</h3>
          
          {step.element && (
            <p className="text-sm text-surface-600 mb-2">{step.element}</p>
          )}
          
          {step.screenshot && (
            <div className="mt-3">
              <img 
                src={step.screenshot} 
                alt={`Step ${index + 1} screenshot`}
                className="w-full h-24 object-cover rounded-lg border border-surface-200"
              />
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0 flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(step);
            }}
            className="p-1 text-surface-400 hover:text-surface-600 transition-colors"
          >
            <ApperIcon name="Edit" size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(step.id);
            }}
            className="p-1 text-surface-400 hover:text-red-500 transition-colors"
          >
            <ApperIcon name="Trash2" size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default StepCard;