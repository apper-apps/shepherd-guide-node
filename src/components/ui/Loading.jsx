import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className }) => {
  return (
    <div className={cn("animate-pulse space-y-6", className)}>
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-surface-200 rounded-lg w-1/3"></div>
        <div className="h-4 bg-surface-200 rounded w-2/3"></div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-surface-200 p-6">
            <div className="space-y-4">
              <div className="h-6 bg-surface-200 rounded w-3/4"></div>
              <div className="h-4 bg-surface-200 rounded w-full"></div>
              <div className="h-4 bg-surface-200 rounded w-5/6"></div>
              <div className="h-32 bg-surface-200 rounded-lg"></div>
              <div className="flex items-center gap-2">
                <div className="h-4 bg-surface-200 rounded w-16"></div>
                <div className="h-4 bg-surface-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;