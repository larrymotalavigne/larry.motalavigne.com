export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  lang: string;
  featured?: boolean;
  content?: string;
}

export interface Project {
  slug: string;
  title: string;
  date: string;
  description: string;
  techStack: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  lang: string;
  content?: string;
}

export interface ContentIndex<T> {
  items: T[];
}
