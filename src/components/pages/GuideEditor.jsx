import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import FormField from "@/components/molecules/FormField";
import StepCard from "@/components/molecules/StepCard";
import StepEditor from "@/components/organisms/StepEditor";
import GuidePreview from "@/components/organisms/GuidePreview";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { guideService } from "@/services/api/guideService";
import { toast } from "react-toastify";

const GuideEditor = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStep, setSelectedStep] = useState(null);
  const [editingStep, setEditingStep] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentPreviewStep, setCurrentPreviewStep] = useState(0);

  useEffect(() => {
    if (id) {
      loadGuide();
    } else {
      // New guide
      setGuide({
        Id: null,
        title: "New Guide",
        description: "",
        steps: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0
      });
      setLoading(false);
    }
  }, [id]);

  const loadGuide = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await guideService.getById(parseInt(id));
      setGuide(data);
    } catch (err) {
      setError("Failed to load guide");
      toast.error("Failed to load guide");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGuide = async () => {
    try {
      if (!guide.title.trim()) {
        toast.error("Please enter a guide title");
        return;
      }

      const updatedGuide = {
        ...guide,
        updatedAt: new Date().toISOString()
      };

      let savedGuide;
      if (guide.Id) {
        savedGuide = await guideService.update(guide.Id, updatedGuide);
      } else {
        savedGuide = await guideService.create(updatedGuide);
      }

      setGuide(savedGuide);
      toast.success("Guide saved successfully");
    } catch (err) {
      toast.error("Failed to save guide");
    }
  };

  const handleGuideInfoChange = (field, value) => {
    setGuide(prev => ({ ...prev, [field]: value }));
  };

  const handleStepEdit = (step) => {
    setEditingStep(step);
  };

  const handleStepSave = (updatedStep) => {
    setGuide(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === updatedStep.id ? updatedStep : step
      )
    }));
    setEditingStep(null);
    toast.success("Step updated successfully");
  };

  const handleStepDelete = (stepId) => {
    if (confirm("Are you sure you want to delete this step?")) {
      setGuide(prev => ({
        ...prev,
        steps: prev.steps.filter(step => step.id !== stepId)
      }));
      toast.success("Step deleted successfully");
    }
  };

  const handleStepReorder = (dragIndex, dropIndex) => {
    const newSteps = [...guide.steps];
    const draggedStep = newSteps[dragIndex];
    newSteps.splice(dragIndex, 1);
    newSteps.splice(dropIndex, 0, draggedStep);
    
    // Update order numbers
    const reorderedSteps = newSteps.map((step, index) => ({
      ...step,
      order: index + 1
    }));

    setGuide(prev => ({ ...prev, steps: reorderedSteps }));
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
        const shareUrl = `${window.location.origin}/guide/${guide.Id}/view`;
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ApperIcon name="ArrowLeft" size={16} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-surface-900">
              {guide.Id ? "Edit Guide" : "New Guide"}
            </h1>
            <p className="text-surface-600">
              {guide.steps.length} steps • Last updated {new Date(guide.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setShowPreview(!showPreview)}>
            <ApperIcon name={showPreview ? "Edit" : "Eye"} size={16} />
            <span className="ml-2">{showPreview ? "Edit" : "Preview"}</span>
          </Button>
          
          <div className="relative group">
            <Button variant="secondary">
              <ApperIcon name="Share" size={16} />
              <span className="ml-2">Export</span>
            </Button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-premium-lg border border-surface-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <div className="p-2">
                <button
                  onClick={() => handleExport("markdown")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-700 hover:bg-surface-50 rounded"
                >
                  <ApperIcon name="FileText" size={16} />
                  Export as Markdown
                </button>
                <button
                  onClick={() => handleExport("link")}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-surface-700 hover:bg-surface-50 rounded"
                >
                  <ApperIcon name="Link" size={16} />
                  Copy Share Link
                </button>
              </div>
            </div>
          </div>
          
          <Button variant="primary" onClick={handleSaveGuide}>
            <ApperIcon name="Save" size={16} />
            <span className="ml-2">Save Guide</span>
          </Button>
        </div>
      </div>

      {showPreview ? (
        <GuidePreview
          guide={guide}
          currentStep={currentPreviewStep}
          onStepChange={setCurrentPreviewStep}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Guide Info & Steps */}
          <div className="space-y-6">
            {/* Guide Info */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <h3 className="text-lg font-semibold text-surface-900 mb-4">Guide Information</h3>
              
              <div className="space-y-4">
                <FormField
                  label="Title"
                  value={guide.title}
                  onChange={(e) => handleGuideInfoChange("title", e.target.value)}
                  placeholder="Enter guide title..."
                />
                
                <FormField
                  label="Description"
                  value={guide.description}
                  onChange={(e) => handleGuideInfoChange("description", e.target.value)}
                  placeholder="Describe what this guide covers..."
                >
                  <textarea
                    value={guide.description}
                    onChange={(e) => handleGuideInfoChange("description", e.target.value)}
                    placeholder="Describe what this guide covers..."
                    className="w-full px-3 py-2 border border-surface-300 rounded-lg bg-white text-surface-900 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </FormField>
              </div>
            </div>

            {/* Steps List */}
            <div className="bg-white rounded-xl border border-surface-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-surface-900">Steps</h3>
                <Button variant="secondary" size="sm">
                  <ApperIcon name="Plus" size={16} />
                  <span className="ml-2">Add Step</span>
                </Button>
              </div>
              
              {guide.steps.length === 0 ? (
                <div className="text-center py-8 text-surface-500">
                  <ApperIcon name="List" size={24} className="mx-auto mb-2" />
                  <p>No steps yet. Start recording to add steps.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {guide.steps.map((step, index) => (
                    <StepCard
                      key={step.id}
                      step={step}
                      index={index}
                      isSelected={selectedStep?.id === step.id}
                      onClick={() => setSelectedStep(step)}
                      onEdit={() => handleStepEdit(step)}
                      onDelete={() => handleStepDelete(step.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Step Editor */}
          <div className="space-y-6">
            {editingStep ? (
              <StepEditor
                step={editingStep}
                onSave={handleStepSave}
                onCancel={() => setEditingStep(null)}
              />
            ) : selectedStep ? (
              <div className="bg-white rounded-xl border border-surface-200 p-6">
                <h3 className="text-lg font-semibold text-surface-900 mb-4">Step Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-surface-900 mb-2">{selectedStep.description}</h4>
                    <p className="text-sm text-surface-600">{selectedStep.element}</p>
                  </div>
                  
                  {selectedStep.screenshot && (
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">
                        Screenshot
                      </label>
                      <img 
                        src={selectedStep.screenshot} 
                        alt="Step screenshot"
                        className="w-full h-48 object-cover rounded-lg border border-surface-200"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 pt-4">
                    <Button variant="primary" onClick={() => handleStepEdit(selectedStep)}>
                      <ApperIcon name="Edit" size={16} />
                      <span className="ml-2">Edit Step</span>
                    </Button>
                    <Button variant="danger" onClick={() => handleStepDelete(selectedStep.id)}>
                      <ApperIcon name="Trash2" size={16} />
                      <span className="ml-2">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-surface-200 p-6 text-center">
                <ApperIcon name="MousePointer" size={24} className="mx-auto mb-2 text-surface-400" />
                <p className="text-surface-600">Select a step to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideEditor;