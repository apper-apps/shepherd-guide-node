import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import ScreenshotViewer from "@/components/molecules/ScreenshotViewer";
import { cn } from "@/utils/cn";

const GuidePreview = ({ 
  guide, 
  currentStep = 0,
  onStepChange,
  className 
}) => {
  const [showScreenshotViewer, setShowScreenshotViewer] = useState(false);

  if (!guide || !guide.steps || guide.steps.length === 0) {
    return (
      <Card className={cn("p-8 text-center", className)}>
        <ApperIcon name="FileText" size={48} className="mx-auto mb-4 text-surface-400" />
        <h3 className="text-lg font-medium text-surface-900 mb-2">No Steps Yet</h3>
        <p className="text-surface-600">Start recording to add steps to your guide.</p>
      </Card>
    );
  }

  const step = guide.steps[currentStep];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Guide Header */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-surface-900 mb-2">{guide.title}</h2>
        <p className="text-surface-600 mb-4">{guide.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-surface-500">
          <div className="flex items-center gap-1">
            <ApperIcon name="List" size={16} />
            <span>{guide.steps.length} steps</span>
          </div>
          <div className="flex items-center gap-1">
            <ApperIcon name="Clock" size={16} />
            <span>~{Math.ceil(guide.steps.length * 0.5)} min</span>
          </div>
        </div>
      </Card>

      {/* Step Content */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
              {currentStep + 1}
            </div>
            <h3 className="text-lg font-semibold text-surface-900">
              Step {currentStep + 1} of {guide.steps.length}
            </h3>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onStepChange(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              <ApperIcon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onStepChange(Math.min(guide.steps.length - 1, currentStep + 1))}
              disabled={currentStep === guide.steps.length - 1}
            >
              <ApperIcon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Step Info */}
          <div>
            <h4 className="font-medium text-surface-900 mb-2">{step.description}</h4>
            {step.element && (
              <p className="text-sm text-surface-600 mb-4">{step.element}</p>
            )}
            
            <div className="flex items-center gap-2 text-sm text-surface-500">
              <ApperIcon name="MousePointer" size={16} />
              <span className="capitalize">{step.action}</span>
            </div>
          </div>

          {/* Screenshot */}
          {step.screenshot && (
            <div>
              <img 
                src={step.screenshot} 
                alt={`Step ${currentStep + 1}`}
                className="w-full h-48 object-cover rounded-lg border border-surface-200 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setShowScreenshotViewer(true)}
              />
              <p className="text-xs text-surface-500 mt-2 text-center">
                Click to view full size
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-surface-200">
          <Button
            variant="secondary"
            onClick={() => onStepChange(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            <ApperIcon name="ChevronLeft" size={16} />
            <span className="ml-2">Previous</span>
          </Button>
          
          <div className="flex items-center gap-2">
            {guide.steps.map((_, index) => (
              <button
                key={index}
                onClick={() => onStepChange(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-200",
                  index === currentStep
                    ? "bg-primary-500"
                    : "bg-surface-300 hover:bg-surface-400"
                )}
              />
            ))}
          </div>
          
          <Button
            variant="primary"
            onClick={() => onStepChange(Math.min(guide.steps.length - 1, currentStep + 1))}
            disabled={currentStep === guide.steps.length - 1}
          >
            <span className="mr-2">Next</span>
            <ApperIcon name="ChevronRight" size={16} />
          </Button>
        </div>
      </Card>

      {/* Screenshot Viewer Modal */}
      {showScreenshotViewer && step.screenshot && (
        <ScreenshotViewer
          screenshot={step.screenshot}
          annotations={step.annotations || []}
          onClose={() => setShowScreenshotViewer(false)}
          onAnnotate={() => {}}
        />
      )}
    </div>
  );
};

export default GuidePreview;