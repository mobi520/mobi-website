import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { MouseProvider } from './context/MouseContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import StrengthsSection from './components/StrengthsSection';
import ContactSection from './components/ContactSection';
import ReadingPage from './components/ReadingPage';
import BackToTop from './components/BackToTop';
import VideoBackground from './components/VideoBackground';
import CursorGlow from './components/CursorGlow';
import type { SectionId } from './types';

const SECTIONS: SectionId[] = ['hero', 'about', 'projects', 'methodology', 'contact'];

type Page = 'home' | 'reading';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [sectionIndex, setSectionIndex] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);

  const handleNavigate = useCallback((target: string) => {
    if (target === 'reading') {
      setPage('reading');
      document.body.style.overflow = 'hidden';
    } else {
      setPage('home');
      document.body.style.overflow = '';
    }
  }, []);

  const handleCloseReading = useCallback(() => {
    setPage('home');
    document.body.style.overflow = '';
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => handleNavigate((e as CustomEvent).detail);
    window.addEventListener('navigate', handler);
    return () => window.removeEventListener('navigate', handler);
  }, [handleNavigate]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Scroll-based active section + progress tracking
  useEffect(() => {
    if (page !== 'home') return;

    const handleScroll = (): void => {
      const sectionEls = SECTIONS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      if (sectionEls.length === 0) return;

      // Determine active section (the one nearest to viewport center)
      let currentIdx = 0;
      let minDist = Infinity;
      const viewCenter = window.innerHeight / 2;

      sectionEls.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - viewCenter);
        if (dist < minDist) {
          minDist = dist;
          currentIdx = i;
        }
      });

      setSectionIndex(currentIdx);
      setActiveSection(SECTIONS[currentIdx]);

      // Section progress (how much of current section has scrolled through viewport)
      const currentEl = sectionEls[currentIdx];
      if (currentEl) {
        const rect = currentEl.getBoundingClientRect();
        const sectionHeight = rect.height || window.innerHeight;
        const progress = 1 - (rect.bottom / (window.innerHeight + sectionHeight));
        setSectionProgress(Math.max(0, Math.min(1, progress)));
      }

      // Total progress
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setTotalProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  return (
    <MouseProvider>
      <CursorGlow />
      <VideoBackground
        activeScene={activeSection}
        sectionProgress={sectionProgress}
        sectionIndex={sectionIndex}
      />

      <Navbar
        onNavigate={handleNavigate}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={activeSection}
        totalProgress={totalProgress}
      />

      {/* Vertical scroll layout */}
      <div className="relative w-full">
        <HeroSection />
        <AboutSection activeSection={activeSection} />
        <ProjectsSection activeSection={activeSection} />
        <StrengthsSection activeSection={activeSection} />
        <ContactSection activeSection={activeSection} />
      </div>

      <BackToTop />

      <AnimatePresence>
        {page === 'reading' && (
          <ReadingPage onClose={handleCloseReading} />
        )}
      </AnimatePresence>
    </MouseProvider>
  );
}
