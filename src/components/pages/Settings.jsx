import React, { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import { settingsService } from "@/services/api/settingsService";
import { toast } from "react-toastify";

const Settings = () => {
  const [settings, setSettings] = useState({
    autoScreenshot: true,
    blurSensitiveData: true,
    recordingQuality: "high",
    exportFormat: "markdown",
    theme: "light",
    autoSave: true,
    notifications: true,
    anonymousAnalytics: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsService.get();
      setSettings(data);
    } catch (err) {
      toast.error("Failed to load settings");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await settingsService.update(settings);
      toast.success("Settings saved successfully");
    } catch (err) {
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-surface-900">Settings</h1>
        <p className="text-surface-600 mt-1">
          Customize your Shepherd experience and recording preferences
        </p>
      </div>

      {/* Recording Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Recording Settings</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-surface-900">Auto Screenshot</h4>
              <p className="text-sm text-surface-600">Automatically capture screenshots for each step</p>
            </div>
            <button
              onClick={() => handleToggle("autoScreenshot")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoScreenshot ? "bg-primary-600" : "bg-surface-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoScreenshot ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-surface-900">Blur Sensitive Data</h4>
              <p className="text-sm text-surface-600">Automatically blur passwords and sensitive fields</p>
            </div>
            <button
              onClick={() => handleToggle("blurSensitiveData")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.blurSensitiveData ? "bg-primary-600" : "bg-surface-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.blurSensitiveData ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-surface-700">
              Recording Quality
            </label>
            <select
              value={settings.recordingQuality}
              onChange={(e) => handleSelect("recordingQuality", e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg bg-white text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="low">Low (Faster processing)</option>
              <option value="medium">Medium (Balanced)</option>
              <option value="high">High (Best quality)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Export Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Export Settings</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-surface-700">
              Default Export Format
            </label>
            <select
              value={settings.exportFormat}
              onChange={(e) => handleSelect("exportFormat", e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg bg-white text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="markdown">Markdown</option>
              <option value="pdf">PDF</option>
              <option value="html">HTML</option>
              <option value="json">JSON</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Appearance Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Appearance</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-surface-700">
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(e) => handleSelect("theme", e.target.value)}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg bg-white text-surface-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System preference)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* General Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-surface-900 mb-4">General</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-surface-900">Auto Save</h4>
              <p className="text-sm text-surface-600">Automatically save changes as you work</p>
            </div>
            <button
              onClick={() => handleToggle("autoSave")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoSave ? "bg-primary-600" : "bg-surface-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoSave ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-surface-900">Notifications</h4>
              <p className="text-sm text-surface-600">Show notifications for guide sharing and updates</p>
            </div>
            <button
              onClick={() => handleToggle("notifications")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications ? "bg-primary-600" : "bg-surface-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-surface-900">Anonymous Analytics</h4>
              <p className="text-sm text-surface-600">Help improve Shepherd by sharing anonymous usage data</p>
            </div>
            <button
              onClick={() => handleToggle("anonymousAnalytics")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.anonymousAnalytics ? "bg-primary-600" : "bg-surface-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.anonymousAnalytics ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button variant="secondary" onClick={loadSettings}>
          <ApperIcon name="RotateCcw" size={16} />
          <span className="ml-2">Reset to Defaults</span>
        </Button>
        
        <Button variant="primary" onClick={handleSave} disabled={loading}>
          <ApperIcon name="Save" size={16} />
          <span className="ml-2">Save Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default Settings;