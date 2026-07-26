import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
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
import SEOHead from './components/SEOHead';
import { WebSiteSchema } from './components/JsonLd';
import { siteMeta } from './data/site';
import type { SectionId } from './types';

// Code-split blog pages for smaller initial bundle
const BlogList = lazy(() => import('./components/BlogList'));
const BlogPostView = lazy(() => import('./components/BlogPost'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#f8f6f4] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-warm-muted border-t-warm-dark rounded-full animate-spin" />
    </div>
  );
}

const SECTIONS: SectionId[] = ['hero', 'about', 'projects', 'methodology', 'contact'];

type Page = 'home' | 'reading' | 'blog-list' | { blogPost: string };

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
    } else if (target === 'blog') {
      setPage('blog-list');
      document.body.style.overflow = '';
    } else {
      setPage('home');
      document.body.style.overflow = '';
    }
  }, []);

  const handleCloseReading = useCallback(() => {
    setPage('home');
    document.body.style.overflow = '';
  }, []);

  const handleSelectPost = useCallback((slug: string) => {
    setPage({ blogPost: slug });
    window.scrollTo(0, 0);
  }, []);

  const handleBackToBlogList = useCallback(() => {
    setPage('blog-list');
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

      const currentEl = sectionEls[currentIdx];
      if (currentEl) {
        const rect = currentEl.getBoundingClientRect();
        const sectionHeight = rect.height || window.innerHeight;
        const progress = 1 - (rect.bottom / (window.innerHeight + sectionHeight));
        setSectionProgress(Math.max(0, Math.min(1, progress)));
      }

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setTotalProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [page]);

  const isHomePage = page === 'home';
  const isBlogPage = page === 'blog-list' || (typeof page === 'object' && 'blogPost' in page);

  return (
    <HelmetProvider>
      <MouseProvider>
        {isHomePage && (
          <>
            <SEOHead
              title={`${siteMeta.name} · ${siteMeta.role}`}
              description={siteMeta.motto}
              url="https://mobi520.cn"
            />
            <WebSiteSchema
              name={siteMeta.name}
              url={siteMeta.siteUrl}
              description={siteMeta.motto}
            />
            <CursorGlow />
            <VideoBackground
              activeScene={activeSection}
              sectionProgress={sectionProgress}
              sectionIndex={sectionIndex}
            />
          </>
        )}

        {!isBlogPage && (
          <Navbar
            onNavigate={handleNavigate}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            activeSection={activeSection}
            totalProgress={totalProgress}
          />
        )}

        {/* Vertical scroll layout — home page */}
        {isHomePage && (
          <div className="relative w-full">
            <HeroSection />
            <AboutSection activeSection={activeSection} />
            <ProjectsSection activeSection={activeSection} />
            <StrengthsSection activeSection={activeSection} />
            <ContactSection activeSection={activeSection} />
          </div>
        )}

        {isHomePage && <BackToTop />}

        <AnimatePresence>
          {page === 'reading' && (
            <ReadingPage onClose={handleCloseReading} />
          )}
        </AnimatePresence>

        {/* Blog pages — lazy loaded */}
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            {page === 'blog-list' && (
              <motion.div
                key="blog-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <BlogList onSelectPost={handleSelectPost} />
              </motion.div>
            )}
            {typeof page === 'object' && 'blogPost' in page && (
              <motion.div
                key={`blog-post-${page.blogPost}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <BlogPostView slug={page.blogPost} onBack={handleBackToBlogList} />
              </motion.div>
            )}
          </AnimatePresence>
        </Suspense>
      </MouseProvider>
    </HelmetProvider>
  );
}
