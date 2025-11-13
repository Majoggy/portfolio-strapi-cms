import type { Schema, Struct } from '@strapi/strapi';

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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'menu-link.menu-link': MenuLinkMenuLink;
    }
  }
}
