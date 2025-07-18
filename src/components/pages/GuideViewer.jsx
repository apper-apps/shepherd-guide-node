import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import GuidePreview from "@/components/organisms/GuidePreview";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { guideService } from "@/services/api/guideService";
import { toast } from "react-toastify";

const GuideViewer = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    loadGuide();
  }, [id]);

  const loadGuide = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await guideService.getById(parseInt(id));
      setGuide(data);
      
      // Increment view count
      await guideService.incrementViews(parseInt(id));
    } catch (err) {
      setError("Failed to load guide");
      toast.error("Failed to load guide");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format) => {
    try {
      if (format === "markdown") {
        const markdown = await guideService.exportToMarkdown(guide.Id);
        const blob = new Blob([markdown], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${guide.title}.md`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Guide exported as Markdown");
      } else if (format === "link") {
        const shareUrl = window.location.href;
        await navigator.clipboard.writeText(shareUrl);
        toast.success("Share link copied to clipboard");
      }
    } catch (err) {
      toast.error("Failed to export guide");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadGuide} />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ApperIcon name="ArrowLeft" size={16} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-surface-900">{guide.title}</h1>
            <p className="text-surface-600">
              {guide.steps.length} steps • {guide.views || 0} views
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => handleExport("link")}>
            <ApperIcon name="Share" size={16} />
            <span className="ml-2">Share</span>
          </Button>
          
          <Button variant="secondary" onClick={() => handleExport("markdown")}>
            <ApperIcon name="Download" size={16} />
            <span className="ml-2">Export</span>
          </Button>
        </div>
      </div>

      {/* Guide Preview */}
      <GuidePreview
        guide={guide}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      {/* Footer */}
      <div className="text-center pt-8 border-t border-surface-200">
        <p className="text-surface-600 mb-4">
          Created with <span className="text-gradient-primary font-semibold">Shepherd</span>
        </p>
        <Button variant="primary" onClick={() => window.location.href = "/"}>
          <ApperIcon name="Compass" size={16} />
          <span className="ml-2">Create Your Own Guide</span>
        </Button>
      </div>
    </div>
  );
};

export default GuideViewer;