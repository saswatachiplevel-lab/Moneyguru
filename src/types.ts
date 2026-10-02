export interface FinancialService {
  id: string;
  title: string;
  category: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  beginnerTips: string[];
  keyConsiderations: string[];
  iconName: string;
  imageUrl: string;
  badge?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content: string[];
  publishedDate: string;
  author: string;
  authorRole: string;
  imageUrl: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  detail: string;
}
