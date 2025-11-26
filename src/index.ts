import type { Core } from '@strapi/strapi';
import { seedTechnologies, seedPortfolio } from './seeds/seed-functions';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const existingPortfolio = await strapi.documents('api::portfolio.portfolio').findFirst();

      if (existingPortfolio) {
        return strapi.log.info('Portfolio data already exists, skipping seed.');
      }

      strapi.log.info('Seeding data...');

      await seedTechnologies(strapi);
      await seedPortfolio(strapi);
    } catch (error) {
      strapi.log.error('Error seeding data:', error);
    }
  },
};
