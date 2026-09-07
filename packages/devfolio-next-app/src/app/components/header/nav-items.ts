export type NavItem = {
  label: string;
  href: string;
  id: string;
};

export type SocialIconKey = 'github' | 'linkedin' | 'x' | 'mail';

export type SocialItem = {
  label: string;
  href: string;
  icon: SocialIconKey;
};

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Experience', href: '#work-experience', id: 'work-experience' },
  { label: 'Stack', href: '#stack', id: 'stack' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const SECTION_IDS: readonly string[] = NAV_ITEMS.map((item) => item.id);

export const SOCIALS: readonly SocialItem[] = [
  { label: 'GitHub', href: '#', icon: 'github' },
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'X', href: '#', icon: 'x' },
  { label: 'Email', href: 'mailto:your.email@example.com', icon: 'mail' },
];
