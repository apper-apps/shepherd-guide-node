import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const ScreenshotViewer = ({ 
  screenshot, 
  annotations = [], 
  onClose,
  onAnnotate,
  className 
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className={cn("fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4", className)}>
      <div className="bg-white rounded-xl shadow-premium-lg max-w-7xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-surface-200">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-surface-900">Screenshot Viewer</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ApperIcon name="ZoomOut" size={16} />
              </Button>
              <span className="text-sm text-surface-600 min-w-[4rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ApperIcon name="ZoomIn" size={16} />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <ApperIcon name="RotateCcw" size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onAnnotate}>
              <ApperIcon name="Edit" size={16} />
              <span className="ml-2">Annotate</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ApperIcon name="X" size={16} />
            </Button>
          </div>
        </div>
        
        {/* Image Container */}
        <div className="relative overflow-auto" style={{ maxHeight: "calc(90vh - 80px)" }}>
          <div className="relative inline-block">
            <img 
              src={screenshot} 
              alt="Screenshot"
              className="block max-w-none"
              style={{ 
                transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
                transformOrigin: "top left"
              }}
            />
            
            {/* Annotations */}
            {annotations.map((annotation, index) => (
              <div
                key={index}
                className="absolute border-2 border-accent-500 bg-accent-500/20 rounded"
                style={{
                  left: annotation.coordinates.x * zoom + pan.x,
                  top: annotation.coordinates.y * zoom + pan.y,
                  width: annotation.coordinates.width * zoom,
                  height: annotation.coordinates.height * zoom,
                }}
              >
                {annotation.text && (
                  <div className="absolute -top-8 left-0 bg-accent-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {annotation.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenshotViewer;