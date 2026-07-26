import { useState, useEffect } from 'react';
import { Mail, Phone, Brain, Compass, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { aboutContent } from '../data/about';
import { contactInfo } from '../data/contact';
import type { SectionId } from '../types';
import type { LucideIcon } from 'lucide-react';
import avatarSrc from '/profile-photo.png';

const labelIconMap: Record<string, LucideIcon> = { Brain, Compass };

interface CountUpProps {
  target: string | number;
  suffix?: string;
  duration?: number;
  active?: boolean;
}

function CountUp({ target, suffix = '', duration = 2000, active = false }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!active || hasAnimated || typeof target === 'string') return;
    setHasAnimated(true);
    const startTime = performance.now();
    const numericTarget = Number(target);
    const animate = (now: number): void => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numericTarget));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [active, target, duration, hasAnimated]);

  if (typeof target === 'string') return <span>{target}</span>;
  return <span>{count}{suffix}</span>;
}

interface AboutSectionProps {
  activeSection: SectionId;
}

export default function AboutSection({ activeSection }: AboutSectionProps) {
  const isActive = activeSection === 'about';

  return (
    <section id="about" className="horizontal-panel">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f9f5]/75 via-[#f8faf7]/55 to-[#f5f9f5]/75 backdrop-blur-[1px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, ease: [0.14, 0.8, 0.32, 1] as const }}
        className="relative z-10 w-full max-w-page mx-auto px-8 md:px-16 h-full flex flex-col justify-center py-12"
      >
        {/* Section header */}
        <div className="mb-8">
          <p className="section-subtitle-magazine text-warm-muted mb-3">About</p>
          <h2 className="section-title-magazine text-warm-dark">关于我</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Avatar */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative hover-scale click-bounce">
              <img
                src={avatarSrc}
                alt={aboutContent.introTitle}
                loading="lazy"
                width="288"
                height="288"
                className="w-56 h-56 md:w-72 md:h-72 rounded-2xl shadow-2xl object-cover hover-glow-warm"
              />
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-warm-warm/8 to-warm-accent/6 blur-3xl" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8 space-y-5">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-warm-dark leading-snug mb-4">
                {aboutContent.introTitle}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {aboutContent.labels.map((label, i) => {
                  const Icon = labelIconMap[label.icon];
                  return (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warm-bg text-xs text-warm-gray font-medium hover-scale click-bounce"
                    >
                      {Icon && <Icon size={13} className="text-warm-dark/50" />}
                      {label.text}
                    </span>
                  );
                })}
              </div>
            </div>

            {aboutContent.introParagraphs.slice(0, 2).map((p, i) => (
              <p key={i} className="prose-editorial text-warm-gray">
                {p}
              </p>
            ))}

            {aboutContent.interests && aboutContent.interests.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {aboutContent.interests.map((item, i) => (
                  <span
                    key={i}
                    className="hover-scale inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/60 border border-white/60 text-sm text-warm-gray font-medium shadow-sm backdrop-blur-sm click-bounce"
                  >
                    {item.emoji && <span className="text-base">{item.emoji}</span>}
                    {item.label}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-2">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-sm text-warm-gray hover:text-warm-dark transition-colors group click-bounce">
                <span className="w-9 h-9 rounded-full bg-white/60 flex items-center justify-center group-hover:bg-white transition-colors backdrop-blur-sm">
                  <Mail size={16} className="text-warm-dark" />
                </span>
                {contactInfo.email}
              </a>
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 text-sm text-warm-gray hover:text-warm-dark transition-colors group click-bounce">
                <span className="w-9 h-9 rounded-full bg-white/60 flex items-center justify-center group-hover:bg-white transition-colors backdrop-blur-sm" aria-hidden="true">
                  <Phone size={16} className="text-warm-dark" />
                </span>
                {contactInfo.phone}
              </a>
              <a
                href={contactInfo.resumeUrl}
                download
                aria-label="下载简历 (PDF)"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-dark text-white text-sm font-medium hover:opacity-90 transition-all shadow-sm click-bounce hover-scale"
              >
                <FileText size={15} strokeWidth={1.5} />
                下载简历
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-warm-warm/10">
          {aboutContent.stats.map((stat, i) => (
            <div key={i} className="text-center p-3 rounded-xl hover:bg-gradient-to-b hover:from-warm-warm/[0.04] hover:to-transparent transition-all duration-400 click-bounce">
              <div className="text-2xl md:text-3xl font-bold text-warm-dark mb-1 tracking-tight">
                <CountUp target={stat.value} suffix={stat.suffix || ''} active={isActive} />
              </div>
              <div className="text-xs text-warm-gray">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
