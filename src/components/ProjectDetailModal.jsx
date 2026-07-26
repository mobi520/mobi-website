import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Check, GitBranch, ExternalLink } from 'lucide-react';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  exit: { opacity: 0, y: 40, scale: 0.96, transition: { duration: 0.2 } },
};

export default function ProjectDetailModal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const d = project.detail;
  if (!d) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-warm-darker/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal card */}
      <motion.div
        className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 float-right mr-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors"
        >
          <X size={18} className="text-warm-dark" />
        </button>

        {/* Gradient header bar */}
        <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

        {/* Content */}
        <div className="px-6 md:px-10 pb-10 -mt-1">
          <span className="inline-block px-3 py-1 rounded-full bg-warm-bg text-xs text-warm-gray font-medium tracking-wide mb-4">
            {project.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-warm-dark mb-3 leading-snug">
            {project.title}

          {/* GitHub & Demo links */}
          {(project.links?.github || project.links?.demo) && (
            <div className="flex items-center gap-3 mb-6">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-dark text-white text-sm font-medium hover:bg-warm-darker transition-all shadow-sm"
                >
                  <GitBranch size={16} strokeWidth={1.5} />
                  查看源码
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-warm-dark text-sm font-medium hover:bg-warm-bg transition-all"
                >
                  <ExternalLink size={16} strokeWidth={1.5} />
                  在线演示
                </a>
              )}
            </div>
          )}
          </h2>

          {d.overview && (
            <p className="text-warm-gray text-base leading-relaxed mb-8">
              {d.overview}
            </p>
          )}

          {d.architecture && (
            <div className="mb-8 bg-warm-bg rounded-2xl p-5 md:p-6 border border-gray-100">
              <h3 className="text-xs font-semibold text-warm-dark tracking-wider mb-3 uppercase">
                核心架构
              </h3>
              <p className="text-warm-gray text-sm leading-relaxed">
                {d.architecture}
              </p>
            </div>
          )}

          {d.features && d.features.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-warm-dark tracking-wider mb-4 uppercase">
                关键特性
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {d.features.map((f, i) => (
                  <div key={i} className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
                    <h4 className="text-sm font-semibold text-warm-dark mb-1.5">{f.title}</h4>
                    <p className="text-warm-gray text-xs leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {d.techStack && d.techStack.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-warm-dark tracking-wider mb-4 uppercase">
                技术栈
              </h3>
              <div className="flex flex-wrap gap-2">
                {d.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 text-xs font-medium text-warm-dark"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {d.highlights && d.highlights.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-warm-dark tracking-wider mb-4 uppercase">
                项目亮点
              </h3>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {d.highlights.map((h, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-xs text-warm-gray">
                    <Check size={12} className="text-green-500 shrink-0" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
