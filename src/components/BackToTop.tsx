import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = (): void => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="回到顶部"
      className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-warm-dark/80 text-white flex items-center justify-center shadow-lg hover:bg-warm-dark transition-all duration-300"
    >
      <ArrowUp size={18} strokeWidth={2} />
    </button>
  );
}
