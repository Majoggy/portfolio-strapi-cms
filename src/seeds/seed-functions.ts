import type { Core } from '@strapi/strapi';
import { technologyData, projectData, employmentData } from './index';

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
      name: 'Your Name',
      jobTitle: 'Full Stack Developer',
      about: "I’m a software engineer who enjoys building things people actually use. Most of my time is spent using React, TypeScript, and Node — creating everything from marketing sites and customer-facing tools to internal platforms that make everyday work a little easier.",
      link: [
        {
          __component: 'menu-link.menu-link',
          label: 'Projects',
          href: '#projects',
          isExternal: false,
        },
        {
          __component: 'menu-link.menu-link',
          label: 'Employment',
          href: '#employment',
          isExternal: false,
        },
        {
          __component: 'menu-link.menu-link',
          label: 'GitHub',
          href: 'https://www.github.com/majoggy',
          isExternal: true,
        },
        {
          __component: 'menu-link.menu-link',
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/in/cpr-baker/',
          isExternal: true,
        },
        {
          __component: 'menu-link.menu-link',
          label: 'Email',
          href: 'mailto:cbaker87gmail.com',
          isExternal: true,
        },
      ],
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
