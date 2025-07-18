import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const RecordingIndicator = ({ 
  isRecording, 
  stepCount = 0, 
  duration = "00:00" 
}) => {
  if (!isRecording) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-premium-lg border border-surface-200 p-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-accent rounded-full animate-recording-pulse"></div>
          <span className="text-sm font-medium text-surface-900">Recording</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-surface-600">
          <ApperIcon name="Clock" size={16} />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-surface-600">
          <ApperIcon name="MousePointer" size={16} />
          <span>{stepCount} steps</span>
        </div>
      </div>
    </div>
  );
};

export default RecordingIndicator;