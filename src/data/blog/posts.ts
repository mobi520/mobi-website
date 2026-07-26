import type { BlogMeta } from '../../types/blog';

// MDX component imports
export { default as ThinkingInStructures } from './thinking-in-structures.mdx';
export { default as ReadingAndThinking } from './reading-and-thinking.mdx';

// Post metadata registry
export const blogPosts: BlogMeta[] = [
  {
    slug: 'thinking-in-structures',
    title: '结构化思考：从模糊问题到可执行方案',
    date: '2026-07-20',
    tags: ['方法论', '思维方式', '问题拆解'],
    excerpt: '面对模糊的商业挑战时，大多数人第一反应是"找答案"。但真正有价值的第一步，是"定义正确的问题"。',
    author: 'mobi',
  },
  {
    slug: 'reading-and-thinking',
    title: '阅读与思考：为什么跨学科阅读是策略师的必修课',
    date: '2026-07-15',
    tags: ['阅读', '跨学科', '认知'],
    excerpt: '从《窄门》到《贪婪的多巴胺》，看似不相关的书其实指向同一个母题——理解"人"这个物种如何运作。',
    author: 'mobi',
  },
];

// Helper: get posts sorted by date (newest first)
export function getSortedPosts(): BlogMeta[] {
  return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Helper: get post by slug
export function getPostBySlug(slug: string): BlogMeta | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

// Helper: get all unique tags
export function getAllTags(): string[] {
  const tagSet = new Set(blogPosts.flatMap((p) => p.tags));
  return [...tagSet].sort();
}

// Helper: get posts by tag
export function getPostsByTag(tag: string): BlogMeta[] {
  return getSortedPosts().filter((p) => p.tags.includes(tag));
}
