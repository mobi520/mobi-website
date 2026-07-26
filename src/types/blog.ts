import type { ComponentType } from 'react';

export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  cover?: string;
  readingTime?: number;
  author: string;
}

export interface BlogPost {
  meta: BlogMeta;
  default: ComponentType;
}
