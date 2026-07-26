import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight, Search } from 'lucide-react';
import { getSortedPosts, getAllTags, getPostsByTag } from '../data/blog/posts';
import type { BlogMeta } from '../types/blog';

interface BlogListProps {
  onSelectPost: (slug: string) => void;
}

export default function BlogList({ onSelectPost }: BlogListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const posts = selectedTag ? getPostsByTag(selectedTag) : getSortedPosts();
  const allTags = getAllTags();

  const filteredPosts = searchQuery
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : posts;

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f6f4]">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-warm-dark mb-4">博客</h1>
          <p className="text-warm-gray text-lg">思考、阅读与方法的沉淀</p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-warm-muted" />
          <input
            type="text"
            placeholder="搜索文章..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 text-warm-dark placeholder-warm-muted focus:outline-none focus:border-warm-accent/30 transition-colors"
          />
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedTag === null
                ? 'bg-warm-dark text-white'
                : 'bg-white text-warm-gray hover:bg-warm-bg border border-gray-200'
            }`}
          >
            全部
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                tag === selectedTag
                  ? 'bg-warm-dark text-white'
                  : 'bg-white text-warm-gray hover:bg-warm-bg border border-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Post list */}
        <div className="space-y-6">
          {filteredPosts.map((post, i) => (
            <PostCard
              key={post.slug}
              post={post}
              index={i}
              onClick={() => onSelectPost(post.slug)}
              formatDate={formatDate}
            />
          ))}
          {filteredPosts.length === 0 && (
            <p className="text-center text-warm-muted py-12">没有找到匹配的文章</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface PostCardProps {
  post: BlogMeta;
  index: number;
  onClick: () => void;
  formatDate: (d: string) => string;
}

function PostCard({ post, index, onClick, formatDate }: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-2xl p-6 md:p-7 border border-gray-100 hover:border-[#d0c0b0] hover:shadow-lg transition-all duration-400"
    >
      <div className="flex items-center gap-4 text-xs text-warm-muted mb-3">
        <span className="flex items-center gap-1.5">
          <Calendar size={13} />
          {formatDate(post.date)}
        </span>
        {post.tags.length > 0 && (
          <span className="flex items-center gap-1.5">
            <Tag size={13} />
            {post.tags[0]}
            {post.tags.length > 1 && ` +${post.tags.length - 1}`}
          </span>
        )}
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-warm-dark mb-2 group-hover:text-[#8a7350] transition-colors">
        {post.title}
      </h2>
      <p className="text-warm-gray text-sm leading-relaxed mb-4">{post.excerpt}</p>

      <div className="flex items-center gap-1.5 text-sm text-warm-muted group-hover:text-warm-dark transition-colors">
        阅读全文 <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </div>
    </motion.article>
  );
}
