import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code2, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectDetailModal from './ProjectDetailModal';
import type { Project, SectionId } from '../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const hasDetail = !!project.detail;
  const hasLinks = project.links && (project.links.github || project.links.demo);
  const hasImage = !!project.image;
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateY(((x - centerX) / centerX) * 5);
    setRotateX(-((y - centerY) / centerY) * 5);
    setGlowX((x / rect.width) * 100);
    setGlowY((y / rect.height) * 100);
  };

  const handleMouseLeave = (): void => {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  };

  return (
    <div
      className={`card-editorial group overflow-hidden hover-scale click-bounce cursor-pointer`}
      onClick={hasDetail ? onClick : undefined}
      role={hasDetail ? 'button' : undefined}
      tabIndex={hasDetail ? 0 : undefined}
      onKeyDown={hasDetail ? (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: rotateX === 0 && rotateY === 0 ? 'all 0.5s ease-out' : 'none',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(100,150,140,0.08) 0%, transparent 60%)`,
        }}
      />

      {hasImage ? (
        <div className="relative w-full h-36 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            width="400"
            height="144"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium tracking-wider">
            {project.category}
          </span>
        </div>
      ) : (
        <div className={`relative h-36 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
          <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-white/10" />
          <div className="absolute bottom-3 left-3 w-20 h-20 rounded-full bg-white/5" />
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-[10px] font-medium tracking-wide">
            {project.category}
          </span>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-base font-semibold text-warm-dark mb-1.5 group-hover:text-warm-accent transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-warm-gray text-xs leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        {hasLinks && (
          <div className="flex items-center gap-2 mb-3" onClick={(e) => e.stopPropagation()}>
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-warm-dark text-white text-[10px] font-medium hover:bg-warm-accent transition-all shadow-sm click-bounce"
                onClick={(e) => e.stopPropagation()}
              >
                <Code2 size={11} strokeWidth={1.5} />
                源码
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-warm-dark text-[10px] font-medium hover:bg-warm-bg transition-all"
              >
                <ExternalLink size={11} strokeWidth={1.5} />
                演示
              </a>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-warm-bg text-[10px] text-warm-gray font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProjectsSectionProps {
  activeSection: SectionId;
}

export default function ProjectsSection({ activeSection }: ProjectsSectionProps) {
  const isActive = activeSection === 'projects';
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="horizontal-panel">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f7f5]/75 via-[#f5faf8]/55 to-[#f0f7f5]/75 backdrop-blur-[1px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: [0.14, 0.8, 0.32, 1] as const }}
        className="relative z-10 w-full max-w-page mx-auto px-8 md:px-16 h-full flex flex-col justify-center py-10"
      >
        <div className="mb-6">
          <p className="section-subtitle-magazine text-warm-muted mb-2">Selected Works</p>
          <h2 className="section-title-magazine text-warm-dark">精选项目</h2>
          <p className="text-warm-gray mt-2 text-sm max-w-lg">每个项目都是一次从策略到交付的完整旅程</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
