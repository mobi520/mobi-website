import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from 'react';
import type { MouseState } from '../types';

interface MouseContextValue extends MouseState {}

const MouseContext = createContext<MouseContextValue | null>(null);

export function MouseProvider({ children }: { children: ReactNode }) {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5, normalizedX: 0, normalizedY: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const rafRef = useRef<number | null>(null);
  const latestRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mql.addEventListener('change', onChange);

    const touchMql = window.matchMedia('(pointer: coarse)');
    setIsTouch(touchMql.matches);
    const onTouchChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    touchMql.addEventListener('change', onTouchChange);

    return () => {
      mql.removeEventListener('change', onChange);
      touchMql.removeEventListener('change', onTouchChange);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion || isTouch) return;

    const handleMove = (e: MouseEvent): void => {
      latestRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          const { x, y } = latestRef.current;
          setMouse({
            x,
            y,
            normalizedX: x - 0.5,
            normalizedY: y - 0.5,
          });
          rafRef.current = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduceMotion, isTouch]);

  return (
    <MouseContext.Provider value={{ ...mouse, reduceMotion, isTouch }}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouse(): MouseContextValue {
  const ctx = useContext(MouseContext);
  if (!ctx) throw new Error('useMouse must be used within MouseProvider');
  return ctx;
}

export default MouseContext;
