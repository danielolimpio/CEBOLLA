
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  publishedDate: string;
  featuredImage: string;
  imageAlt: string;
  metaDescription?: string;
  author: string;
  readTime?: string;
  views?: number;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  logo: string | null;
  footerText: string;
  socialLinks: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}
