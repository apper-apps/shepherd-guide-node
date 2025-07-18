import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import GuideCard from "@/components/molecules/GuideCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { guideService } from "@/services/api/guideService";
import { toast } from "react-toastify";

const MyGuides = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("updated");
  const [selectedGuides, setSelectedGuides] = useState([]);

  useEffect(() => {
    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await guideService.getAll();
      setGuides(data);
    } catch (err) {
      setError("Failed to load guides");
      toast.error("Failed to load guides");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
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

  const handleBulkDelete = async () => {
    if (selectedGuides.length === 0) return;
    
    if (confirm(`Are you sure you want to delete ${selectedGuides.length} guides?`)) {
      try {
        await Promise.all(selectedGuides.map(id => guideService.delete(id)));
        setGuides(guides.filter(g => !selectedGuides.includes(g.Id)));
        setSelectedGuides([]);
        toast.success(`${selectedGuides.length} guides deleted successfully`);
      } catch (err) {
        toast.error("Failed to delete guides");
      }
    }
  };

  const toggleGuideSelection = (guideId) => {
    setSelectedGuides(prev => 
      prev.includes(guideId) 
        ? prev.filter(id => id !== guideId)
        : [...prev, guideId]
    );
  };

  // Filter and sort guides
  const filteredGuides = guides
    .filter(guide => 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "created":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "updated":
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case "views":
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadGuides} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-surface-900">My Guides</h1>
          <p className="text-surface-600 mt-1">
            Manage all your step-by-step guides in one place
          </p>
        </div>
        
        <Button variant="primary">
          <ApperIcon name="Plus" size={16} />
          <span className="ml-2">New Guide</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <ApperIcon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
          <Input
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="px-3 py-2 border border-surface-300 rounded-lg bg-white text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="updated">Last Updated</option>
            <option value="created">Date Created</option>
            <option value="title">Title</option>
            <option value="views">Views</option>
          </select>
          
          {selectedGuides.length > 0 && (
            <Button variant="danger" onClick={handleBulkDelete}>
              <ApperIcon name="Trash2" size={16} />
              <span className="ml-2">Delete ({selectedGuides.length})</span>
            </Button>
          )}
        </div>
      </div>

      {/* Guides Grid */}
      {filteredGuides.length === 0 ? (
        <Empty
          icon="BookOpen"
          title={searchQuery ? "No guides found" : "No guides yet"}
          description={searchQuery ? "Try adjusting your search terms." : "Start creating your first guide by recording your browser actions."}
          action={!searchQuery ? "Start Recording" : undefined}
          onAction={!searchQuery ? () => {} : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div key={guide.Id} className="relative">
              <input
                type="checkbox"
                checked={selectedGuides.includes(guide.Id)}
                onChange={() => toggleGuideSelection(guide.Id)}
                className="absolute top-4 left-4 z-10 w-4 h-4 text-primary-600 bg-white border-surface-300 rounded focus:ring-primary-500"
              />
              <GuideCard
                guide={guide}
                onClick={() => handleGuideClick(guide)}
                onEdit={() => handleEditGuide(guide)}
                onDelete={() => handleDeleteGuide(guide.Id)}
                className={selectedGuides.includes(guide.Id) ? "ring-2 ring-primary-500" : ""}
              />
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {filteredGuides.length > 0 && (
        <div className="text-center text-sm text-surface-500 pt-4 border-t border-surface-200">
          Showing {filteredGuides.length} of {guides.length} guides
        </div>
      )}
    </div>
  );
};

export default MyGuides;