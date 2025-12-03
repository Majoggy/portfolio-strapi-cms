import type { Core } from '@strapi/strapi';
import { technologyData, projectData, employmentData, portfolioData } from './index';

export async function seedTechnologies(strapi: Core.Strapi) {
  for (const name of technologyData) {
    const existingTech = await strapi.documents('api::technology.technology').findMany({
      filters: { name },
      status: 'published',
    });

    if (existingTech.length === 0) {
      await strapi.documents('api::technology.technology').create({
        data: {
          name,
        },
        status: 'published',
      });
      
      strapi.log.info(`Created technology: ${name}`);
    } else {
      strapi.log.info(`Technology already exists: ${name}`);
    }
  }
}

export async function seedPortfolio(strapi: Core.Strapi) {
  const technologies = await strapi.documents('api::technology.technology').findMany({
    status: 'published',
  });

  const getTechIds = (names: string[]) =>
    technologies.filter(t => names.includes(t.name)).map(t => t.documentId);

  await strapi.documents('api::portfolio.portfolio').create({
    data: {
      name: portfolioData.name,
      jobTitle: portfolioData.jobTitle,
      about: portfolioData.about,
      link: portfolioData.links.map((link) => ({
        __component: 'menu-link.menu-link',
        ...link,
      })),
      project: projectData.map((project) => ({
        __component: 'project.project',
        ...project,
        technologies: getTechIds(project.technologies),
      })),
      employment: employmentData.map((emp) => ({
        __component: 'employment.employment',
        ...emp,
        technologies: getTechIds(emp.technologies),
      })),

    },
    status: 'published',
  });

  strapi.log.info('Portfolio data seeded successfully!');
}
