import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { getPostBySlug } from '../data/blog/posts';
import { ThinkingInStructures, ReadingAndThinking } from '../data/blog/posts';
import SEOHead from './SEOHead';
import { BlogPostSchema } from './JsonLd';
import CodeBlock from './CodeBlock';
import GiscusComments from './GiscusComments';
import type { ComponentType } from 'react';

// MDX component map
const postComponents: Record<string, ComponentType> = {
  'thinking-in-structures': ThinkingInStructures,
  'reading-and-thinking': ReadingAndThinking,
};

// Custom components passed to MDX
const mdxComponents = {
  pre: ({ children, ...props }: Record<string, unknown>) => {
    const child = children as { props?: { className?: string; children?: string } } | undefined;
    const className = child?.props?.className || '';
    const langMatch = className.match(/language-(\w+)/);
    const lang = langMatch ? langMatch[1] : 'text';
    const code = child?.props?.children || '';

    if (lang && code) {
      return <CodeBlock code={String(code)} lang={lang} />;
    }
    return <pre {...props}>{children}</pre>;
  },
  code: ({ children, className, ...props }: Record<string, unknown>) => {
    return <code className={className as string} {...props}>{children as React.ReactNode}</code>;
  },
};

interface BlogPostViewProps {
  slug: string;
  onBack: () => void;
}

export default function BlogPostView({ slug, onBack }: BlogPostViewProps) {
  const post = useMemo(() => getPostBySlug(slug), [slug]);
  const PostComponent = postComponents[slug];

  if (!post || !PostComponent) {
    return (
      <div className="min-h-screen bg-[#f8f6f4] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-warm-dark mb-4">文章未找到</h1>
          <button onClick={onBack} className="text-warm-accent hover:underline">
            返回博客列表
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        type="article"
        url={`/blog/${post.slug}`}
        publishedTime={post.date}
        tags={post.tags}
      />
      <BlogPostSchema
        title={post.title}
        url={`https://mobi520.cn/blog/${post.slug}`}
        description={post.excerpt}
        image="https://mobi520.cn/og-image.png"
        datePublished={post.date}
        authorName={post.author}
        authorUrl="https://mobi520.cn"
        tags={post.tags}
      />

      <div className="min-h-screen bg-[#f8f6f4]">
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-20">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-warm-gray hover:text-warm-dark transition-colors mb-8 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            返回博客
          </motion.button>

          {/* Article header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4 text-xs text-warm-muted mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Tag size={13} />
                {post.tags.join(' · ')}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-warm-dark leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-warm-gray text-lg">{post.excerpt}</p>
          </motion.header>

          {/* Article content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="prose-editorial"
          >
            <div className="blog-content">
              <PostComponent components={mdxComponents} />
            </div>
          </motion.div>

          {/* Giscus Comments */}
          <div className="mt-12">
            <GiscusComments />
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-warm-muted text-sm mb-4">感谢阅读</p>
            <button
              onClick={onBack}
              className="text-sm text-warm-dark hover:text-warm-accent transition-colors"
            >
              ← 返回博客列表
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
