import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play, Layers, BarChart3, GitBranch } from 'lucide-react';
import { heroContent } from '../data/hero';
import { readingList } from '../data/reading';
import { useMouse } from '../context/MouseContext';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = { Layers, BarChart3, GitBranch };

export default function HeroSection() {
  const { normalizedX, normalizedY, isTouch, reduceMotion } = useMouse();

  const parallaxStyle = useMemo(() => {
    if (isTouch || reduceMotion) return {};
    return {
      transform: `translate3d(${normalizedX * 30}px, ${normalizedY * 20}px, 0)`,
    };
  }, [normalizedX, normalizedY, isTouch, reduceMotion]);

  const catParallax = useMemo(() => {
    if (isTouch || reduceMotion) return {};
    return {
      transform: `translate3d(${normalizedX * 35}px, ${normalizedY * 25}px, 0)`,
    };
  }, [normalizedX, normalizedY, isTouch, reduceMotion]);

  const [bookIndex, setBookIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const bookTitles = readingList.map((b) => `《${b.title}》`);

  useEffect(() => {
    const interval = setInterval(() => {
      setBookIndex((prev) => (prev + 1) % bookTitles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [bookTitles.length]);

  useEffect(() => {
    const title = bookTitles[bookIndex];
    let charIndex = 0;
    setDisplayText('');
    const typeInterval = setInterval(() => {
      if (charIndex < title.length) {
        setDisplayText(title.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 60);
    return () => clearInterval(typeInterval);
  }, [bookIndex, bookTitles]);

  const heroRef = useRef<HTMLElement>(null);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const, delay },
  });

  const fadeUpScale = (delay = 0) => ({
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay },
  });

  return (
    <section id="hero" ref={heroRef} className="horizontal-panel">
      {/* Background layers */}
      <div className="hero-bg absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
        <div className="noise-overlay opacity-[0.02]" />

        {/* Black cat floating silhouette with mouse parallax */}
        <div
          className="absolute bottom-[16%] left-[5%] z-[1] pointer-events-none opacity-[0.07] select-none transition-transform duration-300 ease-out"
          style={catParallax}
          aria-hidden="true"
        >
          <svg
            width="160"
            height="140"
            viewBox="-20 -40 80 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-[cat-drift_8s_ease-in-out_infinite]"
          >
            <path
              d="M-8 6C-12 2 -14 -4 -10 -10C-7 -15 -3 -18 0 -20C2 -23 6 -26 8 -28L6 -32L10 -30L10 -28L14 -30L14 -34L16 -30C20 -26 22 -22 22 -18C28 -14 30 -4 32 4C28 6 22 8 16 6C18 10 22 14 18 18C14 22 10 18 8 14C6 10 4 8 0 8L-2 16L-5 16L-5 8C-8 8 -10 10 -8 6Z"
              fill="currentColor"
            />
            <circle cx="16" cy="-22" r="1.5" fill="rgba(255,230,200,0.3)" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-page mx-auto px-8 md:px-16 flex flex-col items-center text-center"
        style={parallaxStyle}
      >
        <motion.p
          {...fadeUp(0.2)}
          className="label-magazine text-white/50 mb-8"
        >
          {heroContent.subtitle}
        </motion.p>

        <motion.div
          {...fadeUp(0.4)}
          className="max-w-5xl"
        >
          <h1 className="text-display-xl text-white font-medium mb-6">
            {heroContent.mainTitle}
          </h1>
          <p className="font-serif text-white/70 text-[clamp(1.1rem,2.2vw,1.75rem)] font-light leading-relaxed max-w-2xl mx-auto">
            {heroContent.mainTitleSub}
          </p>
        </motion.div>

        <motion.p
          {...fadeUp(0.9)}
          className="text-white/55 text-base md:text-lg font-light mt-8 max-w-xl leading-relaxed"
        >
          {heroContent.tagline}
        </motion.p>

        {/* Reading list */}
        <div className="mt-6 flex items-center justify-center gap-3 text-white/35 text-xs font-light tracking-wider">
          <span className="inline-block w-1 h-1 rounded-full bg-white/40" />
          近期阅读
          <span className="inline-block w-1 h-1 rounded-full bg-white/40" />
        </div>
        <p className="text-white/45 text-sm font-light mt-2 font-serif tracking-wide min-h-[1.5em]" aria-live="polite">
          {displayText}
          <span className="inline-block w-[2px] h-[1em] bg-white/40 ml-0.5 animate-pulse align-middle" />
        </p>

        {/* Trust anchors */}
        <motion.div
          {...fadeUp(1.3)}
          className="flex flex-wrap justify-center gap-4 mt-10 mb-10"
        >
          {heroContent.trustAnchors.map((anchor, i) => {
            const Icon = iconMap[anchor.icon];
            return (
              <div
                key={i}
                className="hover-scale hover-glow-warm flex-1 min-w-[170px] max-w-[220px] px-5 py-5 rounded-xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm click-bounce"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    {Icon && <Icon size={15} className="text-white/70" />}
                  </div>
                  <h3 className="text-white/85 text-sm font-semibold tracking-wide">{anchor.title}</h3>
                </div>
                <p className="text-white/45 text-xs leading-relaxed pl-11">{anchor.description}</p>
              </div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          {...fadeUpScale(1.7)}
        >
          <a
            href="#contact"
            aria-label="开始合作，跳转到联系区域"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-liquid inline-flex items-center gap-2 !px-8 !py-3 !text-base click-bounce hover-gradient-sweep"
          >
            <Play size={16} className="fill-white" />
            {heroContent.ctaText}
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.1, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-white/35 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-white/60 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
