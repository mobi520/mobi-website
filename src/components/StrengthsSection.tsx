import { motion } from 'framer-motion';
import { Search, Layers, GitBranch, BarChart3, FileText, Zap } from 'lucide-react';
import { strengths } from '../data/strengths';
import type { Strength, SectionId } from '../types';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = { Search, Layers, GitBranch, BarChart3, FileText, Zap };
const spans: string[] = [
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
];

interface StrengthCardProps {
  strength: Strength;
  index: number;
}

function StrengthCard({ strength, index }: StrengthCardProps) {
  const Icon = iconMap[strength.icon] || Search;
  const isLarge = spans[index] === 'md:col-span-2';

  return (
    <div
      className={`card-editorial group flex flex-col hover-scale click-bounce ${spans[index] || ''} ${
        isLarge ? 'p-5 md:p-6' : 'p-4 md:p-5'
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`rounded-xl bg-warm-bg flex items-center justify-center shrink-0 group-hover:bg-warm-dark/[0.05] transition-colors ${
          isLarge ? 'w-11 h-11' : 'w-9 h-9'
        }`}>
          <Icon
            size={isLarge ? 22 : 18}
            className="text-warm-dark group-hover:text-warm-accent transition-colors"
            strokeWidth={1.5}
          />
        </div>
        <span className="text-warm-muted/25 text-[10px] font-mono tracking-widest">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className={`font-semibold text-warm-dark mb-2 ${isLarge ? 'text-lg' : 'text-base'}`}>
        {strength.title}
      </h3>

      <p className={`text-warm-gray leading-relaxed ${isLarge ? 'text-sm' : 'text-xs'}`}>
        {strength.description}
      </p>

      {isLarge && (
        <div className="mt-auto pt-4">
          <div className="h-px w-10 bg-gradient-to-r from-warm-warm/30 to-transparent" />
        </div>
      )}
    </div>
  );
}

interface StrengthsSectionProps {
  activeSection: SectionId;
}

export default function StrengthsSection({ activeSection }: StrengthsSectionProps) {
  const isActive = activeSection === 'methodology';

  return (
    <section id="methodology" className="horizontal-panel">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8f3]/75 via-[#f7faf6]/55 to-[#f4f8f3]/75 backdrop-blur-[1px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: [0.14, 0.8, 0.32, 1] as const }}
        className="relative z-10 w-full max-w-page mx-auto px-8 md:px-16 h-full flex flex-col justify-center py-10"
      >
        <div className="mb-6">
          <p className="section-subtitle-magazine text-warm-muted mb-2">Methodology</p>
          <h2 className="section-title-magazine text-warm-dark">方法论</h2>
          <p className="text-warm-gray mt-2 text-sm max-w-lg">
            从问题到方案，每一步都有结构可循。以下是我反复打磨的思考框架。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {strengths.map((strength, index) => (
            <StrengthCard key={strength.id} strength={strength} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
