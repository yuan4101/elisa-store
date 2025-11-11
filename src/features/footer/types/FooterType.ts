export enum FooterType {
  Text = "text",
  Link = "link",
}

export interface FooterItem {
  type: FooterType;
  href?: string;
  text?: string;
  className?: string;
}