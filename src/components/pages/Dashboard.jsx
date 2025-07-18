import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import GuideCard from "@/components/molecules/GuideCard";
import RecordingIndicator from "@/components/molecules/RecordingIndicator";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { guideService } from "@/services/api/guideService";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingData, setRecordingData] = useState({
    steps: 0,
    duration: "00:00"
  });

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await guideService.getRecentGuides();
      setGuides(data);
    } catch (err) {
      setError("Failed to load guides");
      toast.error("Failed to load guides");
    } finally {
      setLoading(false);
    }
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingData({ steps: 0, duration: "00:00" });
    toast.success("Recording started! Perform actions to capture steps.");
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast.info("Recording stopped. Processing your guide...");
  };

  const handleGuideClick = (guide) => {
    window.location.href = `/guide/${guide.Id}`;
  };

  const handleEditGuide = (guide) => {
    window.location.href = `/guide/${guide.Id}`;
  };

  const handleDeleteGuide = async (guideId) => {
    if (confirm("Are you sure you want to delete this guide?")) {
      try {
        await guideService.delete(guideId);
        setGuides(guides.filter(g => g.Id !== guideId));
        toast.success("Guide deleted successfully");
      } catch (err) {
        toast.error("Failed to delete guide");
      }
    }
  };

  const stats = {
    totalGuides: guides.length,
    totalSteps: guides.reduce((sum, guide) => sum + (guide.steps?.length || 0), 0),
    totalViews: guides.reduce((sum, guide) => sum + (guide.views || 0), 0),
    avgSteps: guides.length > 0 ? Math.round(guides.reduce((sum, guide) => sum + (guide.steps?.length || 0), 0) / guides.length) : 0
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadGuides} />;

  return (
    <div className="space-y-8">
      <RecordingIndicator 
        isRecording={isRecording}
        stepCount={recordingData.steps}
        duration={recordingData.duration}
      />

      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-surface-900">
            Welcome to <span className="text-gradient-primary">Not Shepherd</span>
          </h1>
          <p className="text-xl text-surface-600 max-w-2xl mx-auto">
            Create professional step-by-step guides by recording your browser actions. 
            Perfect for tutorials, onboarding, and documentation.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleStartRecording}
            disabled={isRecording}
          >
            <ApperIcon name="Circle" size={20} />
            <span className="ml-2">Start Recording</span>
          </Button>
          
          {isRecording && (
            <Button 
              variant="danger" 
              size="lg"
              onClick={handleStopRecording}
            >
              <ApperIcon name="Square" size={20} />
              <span className="ml-2">Stop Recording</span>
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="BookOpen" size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-surface-900 mb-1">{stats.totalGuides}</div>
          <div className="text-sm text-surface-600">Total Guides</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="List" size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-surface-900 mb-1">{stats.totalSteps}</div>
          <div className="text-sm text-surface-600">Total Steps</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Eye" size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-surface-900 mb-1">{stats.totalViews}</div>
          <div className="text-sm text-surface-600">Total Views</div>
        </Card>

        <Card className="p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="BarChart" size={24} className="text-white" />
          </div>
          <div className="text-2xl font-bold text-surface-900 mb-1">{stats.avgSteps}</div>
          <div className="text-sm text-surface-600">Avg Steps</div>
        </Card>
      </div>

      {/* Recent Guides */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-surface-900">Recent Guides</h2>
          <Button variant="secondary" onClick={() => window.location.href = "/my-guides"}>
            <span className="mr-2">View All</span>
            <ApperIcon name="ArrowRight" size={16} />
          </Button>
        </div>

        {guides.length === 0 ? (
          <Empty
            icon="BookOpen"
            title="No guides yet"
            description="Start creating your first guide by recording your browser actions."
            action="Start Recording"
            onAction={handleStartRecording}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.slice(0, 6).map((guide) => (
              <GuideCard
                key={guide.Id}
                guide={guide}
                onClick={() => handleGuideClick(guide)}
                onEdit={() => handleEditGuide(guide)}
                onDelete={() => handleDeleteGuide(guide.Id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="ghost" className="p-4 h-auto flex-col">
            <ApperIcon name="Plus" size={24} className="mb-2" />
            <span className="font-medium">Create New Guide</span>
            <span className="text-sm text-surface-600">Start from scratch</span>
          </Button>
          
          <Button variant="ghost" className="p-4 h-auto flex-col">
            <ApperIcon name="Upload" size={24} className="mb-2" />
            <span className="font-medium">Import Guide</span>
            <span className="text-sm text-surface-600">From file or URL</span>
          </Button>
          
          <Button variant="ghost" className="p-4 h-auto flex-col">
            <ApperIcon name="Folder" size={24} className="mb-2" />
            <span className="font-medium">Browse Templates</span>
            <span className="text-sm text-surface-600">Use existing templates</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;