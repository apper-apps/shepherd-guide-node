import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StepEditor = ({ 
  step, 
  onSave, 
  onCancel,
  className 
}) => {
  const [formData, setFormData] = useState({
    description: step?.description || "",
    element: step?.element || "",
    action: step?.action || "click"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...step, ...formData });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-surface-900">Edit Step</h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ApperIcon name="X" size={16} />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Action Type"
          value={formData.action}
          onChange={(e) => handleChange("action", e.target.value)}
        >
          <select 
            value={formData.action}
            onChange={(e) => handleChange("action", e.target.value)}
            className="w-full px-3 py-2 border border-surface-300 rounded-lg bg-white text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="click">Click</option>
            <option value="type">Type</option>
            <option value="navigate">Navigate</option>
            <option value="scroll">Scroll</option>
          </select>
        </FormField>

        <FormField
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Describe what happens in this step..."
        />

        <FormField
          label="Element"
          value={formData.element}
          onChange={(e) => handleChange("element", e.target.value)}
          placeholder="CSS selector or element description..."
        />

        {step?.screenshot && (
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">
              Screenshot
            </label>
            <img 
              src={step.screenshot} 
              alt="Step screenshot"
              className="w-full h-48 object-cover rounded-lg border border-surface-200"
            />
          </div>
        )}

        <div className="flex items-center gap-3 pt-4">
          <Button type="submit" variant="primary">
            <ApperIcon name="Save" size={16} />
            <span className="ml-2">Save Changes</span>
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default StepEditor;