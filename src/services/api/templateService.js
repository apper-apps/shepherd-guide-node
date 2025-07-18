import mockTemplates from "@/services/mockData/templates.json";

let templates = [...mockTemplates];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const templateService = {
  async getAll() {
    await delay(300);
    return templates.map(template => ({ ...template }));
  },

  async getById(id) {
    await delay(200);
    const template = templates.find(t => t.Id === id);
    if (!template) {
      throw new Error("Template not found");
    }
    return { ...template };
  },

  async createFromTemplate(templateId) {
    await delay(400);
    const template = templates.find(t => t.Id === templateId);
    if (!template) {
      throw new Error("Template not found");
    }

    // Simulate creating a new guide from template
    const newGuide = {
      Id: Math.floor(Math.random() * 10000) + 1000,
      title: `${template.title} - Copy`,
      description: template.description,
      steps: template.templateSteps || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      status: "Draft"
    };

    // Increment download count
    template.downloads = (template.downloads || 0) + 1;

    return { ...newGuide };
  }
};