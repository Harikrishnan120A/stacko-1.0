import React from 'react';

const floatingShapes = [
  {
    size: "48rem",
    style: {
      top: "-12%",
      left: "10%",
      background: "radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.35), transparent 65%)",
    },
  },
  {
    size: "42rem",
    style: {
      bottom: "-18%",
      right: "8%",
      background: "radial-gradient(circle at 70% 40%, rgba(107, 70, 193, 0.28), transparent 70%)",
    },
  },
  {
    size: "36rem",
    style: {
      top: "28%",
      left: "60%",
      background: "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.22), transparent 60%)",
    },
  },
];

const Background = React.memo(() => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(107,70,193,0.14),_transparent_58%),_radial-gradient(circle_at_bottom,_rgba(139,92,246,0.12),_transparent_60%),_#000000]" />

      <div className="absolute inset-[-10%] bg-[linear-gradient(110deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.06)_45%,rgba(0,0,0,0)_85%)] diagonal-mask" />

      {floatingShapes.map((shape, index) => (
        <div
          key={index}
          className="floating-shape"
          style={{
            width: shape.size,
            height: shape.size,
            ...shape.style,
          }}
        />
      ))}

      <div
        className="absolute inset-0 opacity-25"
        style={{ maskImage: "radial-gradient(circle at 50% 50%, black 0%, transparent 72%)" }}
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stacko-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(148, 163, 184, 0.08)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stacko-grid)" />
        </svg>
      </div>
    </div>
  );
});

Background.displayName = 'Background';
export default Background;
