import { motion } from 'framer-motion';
import { X, BookOpen, Quote, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { readingList } from '../data/reading';
import { siteMeta } from '../data/site';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.14, 0.8, 0.32, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.32, 0, 0.68, 1] as const },
  },
};

const bookCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: 0.6 + i * 0.12, ease: [0.14, 0.8, 0.32, 1] as const },
  }),
};

interface ReadingPageProps {
  onClose: () => void;
}

export default function ReadingPage({ onClose }: ReadingPageProps) {
  const { t } = useTranslation();
  return (
    <motion.div
      className="fixed inset-0 z-40 bg-[#f8f6f4] overflow-y-auto"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-[#f8f6f4]/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm text-warm-gray hover:text-warm-dark transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            {t('reading.backToHome')}
          </button>
          <span className="text-xs text-warm-muted font-medium tracking-wider uppercase">
            {siteMeta.name} · 书影
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.14, 0.8, 0.32, 1] as const }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-warm-dark/5 flex items-center justify-center">
              <BookOpen size={18} className="text-warm-dark" strokeWidth={1.5} />
            </div>
            <span className="text-xs text-warm-muted tracking-[0.2em] uppercase font-medium">{t('reading.readingLabel')}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-warm-dark leading-[1.1] tracking-[-0.02em] mb-4">
            {t('reading.title')}
          </h1>
          <p className="text-warm-gray text-base md:text-lg max-w-xl leading-relaxed">
            {t('reading.description')}
          </p>
        </motion.div>

        {/* Quote / Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-white to-warm-bg border border-gray-100 mb-16"
        >
          <div className="absolute top-6 left-6 text-warm-accent/10">
            <Quote size={48} strokeWidth={1} />
          </div>
          <div className="relative z-10 pl-4 md:pl-12">
            <p className="text-warm-gray text-base md:text-lg leading-relaxed mb-6 italic">
              阅读是与我工作方式最接近的一件事——把一本书拆开，理解它的论述结构，辨别它依赖的假设，然后重新组装成自己的理解。
            </p>
            <p className="text-warm-gray text-sm leading-relaxed">
              从《窄门》到《性学三论》，从《经济学原理》到《贪婪的多巴胺》——这些看似不相关的书其实指向同一个母题：<strong className="text-warm-dark">"人"这个物种如何运作</strong>。我们如何选择、如何爱、如何欺骗自己、如何在欲望与理性之间反复横跳。每一本书都是一面棱镜，折射出人性的一个切面。
            </p>
            <p className="text-warm-dark text-sm font-medium mt-6">—— {siteMeta.name}</p>
          </div>
        </motion.div>

        {/* Book List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-warm-muted tracking-widest font-semibold uppercase px-3">近期深度阅读 · {readingList.length} 本</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {readingList.map((book, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={bookCardVariants}
                initial="hidden"
                animate="visible"
                className="group relative p-6 md:p-7 rounded-2xl bg-white border border-gray-100 hover:border-[#d0c0b0] hover:shadow-lg transition-all duration-400"
              >
                {/* Book number badge */}
                <div className="absolute top-5 right-5 w-7 h-7 rounded-full bg-warm-bg flex items-center justify-center">
                  <span className="text-[10px] font-bold text-warm-muted">{String(i + 1).padStart(2, '0')}</span>
                </div>

                <div className="pr-8">
                  {/* Category hint */}
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#f5f0eb] text-[10px] text-warm-muted font-medium tracking-wide mb-3">
                    {book.author}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-warm-dark mb-2 leading-snug group-hover:text-[#8a7350] transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed">
                    {book.note}
                  </p>
                </div>

                {/* Subtle bottom accent */}
                <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] text-warm-muted tracking-wider">阅读笔记 · {new Date().getFullYear()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-16 pt-8 border-t border-gray-200 text-center"
        >
          <p className="text-warm-muted text-sm mb-2">{t('reading.footerText')}</p>
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-sm text-warm-dark hover:text-warm-accent transition-colors mt-2"
          >
            {t('reading.backToHome')} <ArrowLeft size={14} />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
