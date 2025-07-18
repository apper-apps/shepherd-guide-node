import React from "react";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";
import { cn } from "@/utils/cn";

const GuideCard = ({ 
  guide, 
  onClick,
  onEdit,
  onDelete,
  className 
}) => {
  return (
    <Card 
      className={cn(
        "p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-surface-900 mb-2">{guide.title}</h3>
          <p className="text-sm text-surface-600 mb-3">{guide.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-surface-500">
            <div className="flex items-center gap-1">
              <ApperIcon name="List" size={16} />
              <span>{guide.steps?.length || 0} steps</span>
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Eye" size={16} />
              <span>{guide.views || 0} views</span>
            </div>
            <div className="flex items-center gap-1">
              <ApperIcon name="Calendar" size={16} />
              <span>{format(new Date(guide.createdAt), "MMM d, yyyy")}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="primary">{guide.status || "Draft"}</Badge>
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(guide);
              }}
              className="p-1 text-surface-400 hover:text-surface-600 transition-colors"
            >
              <ApperIcon name="Edit" size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(guide.id);
              }}
              className="p-1 text-surface-400 hover:text-red-500 transition-colors"
            >
              <ApperIcon name="Trash2" size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {guide.steps && guide.steps.length > 0 && (
        <div className="mt-4 pt-4 border-t border-surface-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {guide.steps.slice(0, 3).map((step, index) => (
              <div key={step.id} className="flex-shrink-0">
                <img 
                  src={step.screenshot} 
                  alt={`Step ${index + 1}`}
                  className="w-16 h-12 object-cover rounded border border-surface-200"
                />
              </div>
            ))}
            {guide.steps.length > 3 && (
              <div className="flex-shrink-0 w-16 h-12 bg-surface-100 rounded border border-surface-200 flex items-center justify-center text-xs text-surface-500">
                +{guide.steps.length - 3}
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default GuideCard;