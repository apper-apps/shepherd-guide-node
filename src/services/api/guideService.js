import mockGuides from "@/services/mockData/guides.json";

let guides = [...mockGuides];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const guideService = {
  async getAll() {
    await delay(300);
    return guides.map(guide => ({ ...guide }));
  },

  async getById(id) {
    await delay(200);
    const guide = guides.find(g => g.Id === id);
    if (!guide) {
      throw new Error("Guide not found");
    }
    return { ...guide };
  },

  async getRecentGuides(limit = 6) {
    await delay(250);
    return guides
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, limit)
      .map(guide => ({ ...guide }));
  },

  async create(guide) {
    await delay(400);
    const newGuide = {
      ...guide,
      Id: Math.max(...guides.map(g => g.Id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      shareId: Math.random().toString(36).substring(2, 15)
    };
    guides.push(newGuide);
    return { ...newGuide };
  },

  async update(id, updatedGuide) {
    await delay(350);
    const index = guides.findIndex(g => g.Id === id);
    if (index === -1) {
      throw new Error("Guide not found");
    }
    guides[index] = { ...guides[index], ...updatedGuide, updatedAt: new Date().toISOString() };
    return { ...guides[index] };
  },

  async delete(id) {
    await delay(200);
    const index = guides.findIndex(g => g.Id === id);
    if (index === -1) {
      throw new Error("Guide not found");
    }
    guides.splice(index, 1);
    return true;
  },

  async incrementViews(id) {
    await delay(100);
    const guide = guides.find(g => g.Id === id);
    if (guide) {
      guide.views = (guide.views || 0) + 1;
    }
    return guide;
  },

  async exportToMarkdown(id) {
    await delay(500);
    const guide = guides.find(g => g.Id === id);
    if (!guide) {
      throw new Error("Guide not found");
    }

    let markdown = `# ${guide.title}\n\n`;
    markdown += `${guide.description}\n\n`;
    markdown += `## Steps\n\n`;

    guide.steps.forEach((step, index) => {
      markdown += `### Step ${index + 1}: ${step.description}\n\n`;
      if (step.element) {
        markdown += `**Element:** ${step.element}\n\n`;
      }
      if (step.screenshot) {
        markdown += `![Step ${index + 1}](${step.screenshot})\n\n`;
      }
      markdown += `**Action:** ${step.action}\n\n`;
      markdown += `---\n\n`;
    });

    return markdown;
  }
};