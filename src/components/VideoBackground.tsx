import { useEffect, useRef } from 'react';
import { useMouse } from '../context/MouseContext';
import type { SectionId } from '../types';

const SECTIONS: SectionId[] = ['hero', 'about', 'projects', 'methodology', 'contact'];
const VIDEO_SRC: Record<SectionId, string> = {
  hero: '/videos/hero.mp4',
  about: '/videos/about.mp4',
  projects: '/videos/projects.mp4',
  methodology: '/videos/methodology.mp4',
  contact: '/videos/contact.mp4',
};

interface VideoBackgroundProps {
  activeScene?: SectionId;
  sectionProgress?: number;
  sectionIndex?: number;
}

export default function VideoBackground({ activeScene = 'hero', sectionProgress = 0, sectionIndex = 0 }: VideoBackgroundProps) {
  const videoRefs = useRef<Record<string, HTMLVideoElement>>({});
  const { normalizedX, normalizedY, isTouch, reduceMotion } = useMouse();
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const prevIndexRef = useRef(0);

  // Smooth mouse position
  useEffect(() => {
    if (reduceMotion || isTouch) return;
    const animate = (): void => {
      mouseRef.current.x += (normalizedX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (normalizedY - mouseRef.current.y) * 0.08;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [normalizedX, normalizedY, reduceMotion, isTouch]);

  // Play/pause based on active scene
  useEffect(() => {
    SECTIONS.forEach((key) => {
      const video = videoRefs.current[key];
      if (!video) return;
      if (key === activeScene) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeScene]);

  // Bind currentTime to scroll progress within active section
  useEffect(() => {
    const video = videoRefs.current[activeScene];
    if (!video) return;
    const targetTime = Math.max(0, Math.min(video.duration || 15, sectionProgress * (video.duration || 15)));
    if (Math.abs(video.currentTime - targetTime) > 0.1) {
      video.currentTime = targetTime;
    }
  }, [activeScene, sectionProgress]);

  // Section transition: sync previous to start, current to scroll position
  useEffect(() => {
    if (prevIndexRef.current === sectionIndex) return;
    const prevKey = SECTIONS[prevIndexRef.current];
    const prevVideo = videoRefs.current[prevKey];
    if (prevVideo) {
      prevVideo.currentTime = 0;
      prevVideo.pause();
    }
    const currKey = SECTIONS[sectionIndex];
    const currVideo = videoRefs.current[currKey];
    if (currVideo) {
      currVideo.currentTime = Math.max(0, Math.min(currVideo.duration || 15, sectionProgress * (currVideo.duration || 15)));
      currVideo.play().catch(() => {});
    }
    prevIndexRef.current = sectionIndex;
  }, [sectionIndex, sectionProgress]);

  const parallaxX = reduceMotion || isTouch ? 0 : mouseRef.current.x * 20;
  const parallaxY = reduceMotion || isTouch ? 0 : mouseRef.current.y * 12;

  // Skip video on mobile to save bandwidth
  if (isTouch) {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a120d]" aria-hidden="true" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {SECTIONS.map((key) => {
        const isActive = key === activeScene;
        return (
          <video
            key={key}
            ref={(el: HTMLVideoElement | null) => { if (el) videoRefs.current[key] = el; }}
            src={VIDEO_SRC[key]}
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive
                ? `translate3d(${parallaxX}px, ${parallaxY}px, 0) scale(1.05)`
                : 'translate3d(0, 0, 0) scale(1.05)',
              willChange: 'opacity, transform',
            }}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
