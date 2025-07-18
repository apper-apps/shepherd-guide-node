import React, { useState, useEffect } from "react";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { templateService } from "@/services/api/templateService";
import { toast } from "react-toastify";

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await templateService.getAll();
      setTemplates(data);
    } catch (err) {
      setError("Failed to load templates");
      toast.error("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  const handleUseTemplate = async (template) => {
    try {
      const newGuide = await templateService.createFromTemplate(template.Id);
      toast.success("Guide created from template");
      window.location.href = `/guide/${newGuide.Id}`;
    } catch (err) {
      toast.error("Failed to create guide from template");
    }
  };

  const categories = [
    { id: "all", name: "All Templates", icon: "Grid" },
    { id: "onboarding", name: "Onboarding", icon: "UserPlus" },
    { id: "tutorial", name: "Tutorial", icon: "BookOpen" },
    { id: "workflow", name: "Workflow", icon: "Workflow" },
    { id: "documentation", name: "Documentation", icon: "FileText" }
  ];

  const filteredTemplates = templates.filter(template => 
    selectedCategory === "all" || template.category === selectedCategory
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadTemplates} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-surface-900">Guide Templates</h1>
        <p className="text-surface-600 max-w-2xl mx-auto">
          Get started quickly with our pre-built templates. Choose from various categories 
          and customize them to fit your needs.
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "primary" : "ghost"}
            onClick={() => setSelectedCategory(category.id)}
          >
            <ApperIcon name={category.icon} size={16} />
            <span className="ml-2">{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <Empty
          icon="Folder"
          title="No templates found"
          description="No templates available for the selected category."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.Id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-surface-900 mb-2">{template.title}</h3>
                  <p className="text-sm text-surface-600 mb-3">{template.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="primary">{template.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-surface-500">
                      <ApperIcon name="List" size={14} />
                      <span>{template.steps} steps</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {template.preview && (
                <div className="mb-4">
                  <img 
                    src={template.preview} 
                    alt={template.title}
                    className="w-full h-32 object-cover rounded-lg border border-surface-200"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-surface-500">
                  <ApperIcon name="Download" size={14} />
                  <span>{template.downloads || 0} uses</span>
                </div>
                
                <Button 
                  variant="primary" 
                  size="sm"
                  onClick={() => handleUseTemplate(template)}
                >
                  <ApperIcon name="Plus" size={14} />
                  <span className="ml-1">Use Template</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Template CTA */}
      <Card className="p-8 text-center bg-gradient-to-r from-primary-50 to-accent-50">
        <ApperIcon name="Sparkles" size={48} className="mx-auto mb-4 text-primary-600" />
        <h3 className="text-xl font-semibold text-surface-900 mb-2">
          Create Your Own Template
        </h3>
        <p className="text-surface-600 mb-6 max-w-md mx-auto">
          Turn your best guides into reusable templates that others can use as a starting point.
        </p>
        <Button variant="primary">
          <ApperIcon name="Plus" size={16} />
          <span className="ml-2">Create Template</span>
        </Button>
      </Card>
    </div>
  );
};

export default Templates;