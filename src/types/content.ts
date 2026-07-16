export type FaqRow = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
};

export type UniversRow = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  caption: string;
  image_url: string;
  image_alt: string;
  description: string;
  details: string[];
  categories: { label: string; items: string[] }[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  cover_image_alt: string;
  seo_title: string;
  seo_description: string;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
};

export type Testimonial = {
  id: string;
  author_name: string;
  company_name: string;
  role_title: string;
  quote: string;
  rating: number | null;
  avatar_url: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at?: string;
};

export type MediaAsset = {
  id: string;
  src: string;
  alt: string;
  label: string;
  mime_type: string;
  file_size: number;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "nouveau" | "en_cours" | "traite" | "archive";
  source: string;
  created_at: string;
  updated_at?: string;
};

export type Redirect = {
  id: string;
  from_path: string;
  to_path: string;
  status_code: 301 | 302 | 307 | 308;
  is_active: boolean;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string;
  role: "admin" | "editor";
  created_at: string;
  updated_at?: string;
};
