import type { Schema, Struct } from '@strapi/strapi';

export interface EmploymentEmployment extends Struct.ComponentSchema {
  collectionName: 'components_employment_employments';
  info: {
    displayName: 'employment';
  };
  attributes: {
    company: Schema.Attribute.String & Schema.Attribute.Required;
    endDate: Schema.Attribute.Date;
    responsibilities: Schema.Attribute.JSON;
    startDate: Schema.Attribute.Date & Schema.Attribute.Required;
    technologies: Schema.Attribute.Relation<
      'oneToMany',
      'api::technology.technology'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MenuLinkMenuLink extends Struct.ComponentSchema {
  collectionName: 'components_menu_link_menu_links';
  info: {
    displayName: 'menuLink';
    icon: 'alien';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProjectProject extends Struct.ComponentSchema {
  collectionName: 'components_project_projects';
  info: {
    displayName: 'project';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    githubLink: Schema.Attribute.String;
    liveLink: Schema.Attribute.String;
    order: Schema.Attribute.Integer;
    technologies: Schema.Attribute.Relation<
      'oneToMany',
      'api::technology.technology'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'employment.employment': EmploymentEmployment;
      'menu-link.menu-link': MenuLinkMenuLink;
      'project.project': ProjectProject;
    }
  }
}
