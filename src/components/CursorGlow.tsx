import { useMouse } from '../context/MouseContext';

export default function CursorGlow() {
  const { normalizedX, normalizedY, reduceMotion, isTouch } = useMouse();

  if (reduceMotion || isTouch) return <></>;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background: `radial-gradient(600px at ${50 + normalizedX * 8}% ${50 + normalizedY * 8}%, rgba(56, 189, 248, 0.06), transparent 80%)`,
      }}
    />
  );
}
