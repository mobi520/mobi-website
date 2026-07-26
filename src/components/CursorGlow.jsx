import { useEffect, useRef } from 'react';
import { useMouse } from '../context/MouseContext';

export default function CursorGlow() {
  const { x, y, isTouch, reduceMotion } = useMouse();
  const glowRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouch || reduceMotion) return;
    const animate = () => {
      posRef.current.x += (x * window.innerWidth - posRef.current.x) * 0.08;
      posRef.current.y += (y * window.innerHeight - posRef.current.y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.left = `${posRef.current.x}px`;
        glowRef.current.style.top = `${posRef.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [x, y, isTouch, reduceMotion]);

  if (isTouch || reduceMotion) return null;

  return (
    <div
      ref={glowRef}
      className="cursor-glow"
      aria-hidden="true"
    />
  );
}
