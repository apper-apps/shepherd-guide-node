const defaultSettings = {
  autoScreenshot: true,
  blurSensitiveData: true,
  recordingQuality: "high",
  exportFormat: "markdown",
  theme: "light",
  autoSave: true,
  notifications: true,
  anonymousAnalytics: false
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const settingsService = {
  async get() {
    await delay(200);
    const stored = localStorage.getItem("shepherd-settings");
    return stored ? { ...defaultSettings, ...JSON.parse(stored) } : { ...defaultSettings };
  },

  async update(settings) {
    await delay(300);
    localStorage.setItem("shepherd-settings", JSON.stringify(settings));
    return { ...settings };
  },

  async reset() {
    await delay(200);
    localStorage.removeItem("shepherd-settings");
    return { ...defaultSettings };
  }
};