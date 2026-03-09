export interface MenuItem {
    title: string;
    href: string;
    icon?: React.ComponentType;
    children?: MenuItem[];
  }