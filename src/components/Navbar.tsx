import { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { siteMeta } from '../data/site';
import { navLinks } from '../data/nav';
import LanguageSwitcher from './LanguageSwitcher';
import type { SectionId } from '../types';

const SECTION_IDS: SectionId[] = ['hero', 'about', 'projects', 'methodology', 'contact'];
const SECTION_COUNT = 5;

interface NavbarProps {
  onNavigate: (target: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: SectionId;
  totalProgress: number;
}

// Map nav href to i18n key
const navLabelKeys: Record<string, string> = {
  '#about': 'nav.about',
  '#reading': 'nav.reading',
  '#projects': 'nav.projects',
  '#methodology': 'nav.methodology',
  '#contact': 'nav.contact',
};

export default function Navbar({ onNavigate, darkMode, toggleDarkMode, activeSection, totalProgress }: NavbarProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setScrolled(totalProgress > 0.02);
  }, [totalProgress]);

  const getSectionIndex = (href: string): number => {
    const id = href.replace('#', '');
    return SECTION_IDS.indexOf(id as SectionId);
  };

  const scrollToSection = (index: number): void => {
    if (index < 0 || index >= SECTION_COUNT) return;
    const el = document.getElementById(SECTION_IDS[index]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string): void => {
    e.preventDefault();
    setMobileOpen(false);

    if (href === '#reading' && onNavigate) {
      onNavigate('reading');
      return;
    }

    const index = getSectionIndex(href);
    scrollToSection(index);
  };

  const getLinkClass = (href: string): string => {
    const sectionId = href.replace('#', '');
    const isActive = sectionId === activeSection;
    return isActive
      ? 'opacity-100 font-semibold'
      : 'opacity-60 hover:opacity-100';
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(totalProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="页面滚动进度"
        className="fixed top-0 left-0 h-0.5 z-[60] bg-gradient-to-r from-emerald-400/80 to-teal-300/80 transition-all duration-150"
        style={{ width: `${totalProgress * 100}%` }}
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-sm backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-page mx-auto px-8 h-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className={`text-xl font-bold tracking-tight transition-colors duration-500 ${
              scrolled ? 'text-warm-dark' : 'text-white'
            }`}
          >
            {siteMeta.name}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-100 ${getLinkClass(link.href)} ${
                  scrolled ? 'text-warm-dark' : 'text-white/90'
                }`}
              >
                {t(navLabelKeys[link.href] || link.label)}
              </a>
            ))}
            <a
              href="#blog"
              onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}
              className={`text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-100 opacity-60 hover:opacity-100 ${
                scrolled ? 'text-warm-dark' : 'text-white/90'
              }`}
            >
              {t('nav.blog')}
            </a>
            <LanguageSwitcher />
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? t('nav.lightMode') : t('nav.darkMode')}
              className={`p-2 rounded-full transition-colors click-bounce ${
                scrolled ? 'text-warm-dark hover:bg-warm-bg' : 'text-white/70 hover:bg-white/10'
              }`}
            >
              {darkMode ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              aria-label="联系我"
              className={`btn-liquid !py-2 !px-5 !text-sm ${scrolled ? 'btn-liquid-dark' : ''} hover-gradient-sweep click-bounce`}
            >
              {t('nav.contactMe')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? '切换为亮色模式' : '切换为深色模式'}
              className={`p-2 rounded-full transition-colors ${
                scrolled ? 'text-warm-dark' : 'text-white/70'
              }`}
            >
              {darkMode ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={mobileOpen}
              className={`p-2 transition-colors duration-500 ${
                scrolled ? 'text-warm-dark' : 'text-white'
              }`}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-400 ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}>
          <nav aria-label="移动端导航" className="glass px-8 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={link.href.replace('#', '') === activeSection ? 'true' : undefined}
                className={`text-sm font-medium transition-opacity ${
                  link.href.replace('#', '') === activeSection
                    ? 'text-warm-dark font-semibold'
                    : 'text-warm-dark/60 hover:text-warm-dark'
                }`}
              >
                {t(navLabelKeys[link.href] || link.label)}
              </a>
            ))}
            <a
              href="#blog"
              onClick={(e) => { e.preventDefault(); setMobileOpen(false); onNavigate('blog'); }}
              className="text-sm font-medium text-warm-dark/60 hover:text-warm-dark transition-opacity"
            >
              {t('nav.blog')}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-liquid-dark inline-flex !py-2 !px-5 !text-sm w-fit click-bounce"
            >
              {t('nav.contactMe')}
            </a>
          </nav>
        </div>
      </nav>
    </>
  );
}
