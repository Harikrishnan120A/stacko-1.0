'use client';

import React, { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

const MouseTrail = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailPoints = useRef<TrailPoint[]>([]);
  const animationFrameId = useRef<number | undefined>(undefined);
  const isEnabled = useRef(true);
  const lastMouseTime = useRef(0);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    
    if (prefersReducedMotion.matches || isTouch) {
      isEnabled.current = false;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isEnabled.current) return;
      
      // Throttle mouse events to improve performance
      const now = Date.now();
      if (now - lastMouseTime.current < 16) return; // ~60fps
      lastMouseTime.current = now;
      
      trailPoints.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: now,
      });
      
      // Keep only the last 30 points for better performance
      if (trailPoints.current.length > 30) {
        trailPoints.current.shift();
      }
    };

    const animateTrail = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // Filter out old points (older than 1 second)
      trailPoints.current = trailPoints.current.filter(
        (point) => now - point.timestamp < 1000
      );

      if (trailPoints.current.length > 1) {
        // Create multiple trail effects
        drawMainTrail(ctx);
        drawParticleEffect(ctx);
        drawGlowEffect(ctx);
      }

      animationFrameId.current = requestAnimationFrame(animateTrail);
    };

    const drawMainTrail = (ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.moveTo(trailPoints.current[0].x, trailPoints.current[0].y);
      
      for (let i = 1; i < trailPoints.current.length; i++) {
        const p = trailPoints.current[i];
        ctx.lineTo(p.x, p.y);
      }

      // STACKO brand gradient trail
      const gradient = ctx.createLinearGradient(
        trailPoints.current[0].x,
        trailPoints.current[0].y,
        trailPoints.current[trailPoints.current.length - 1].x,
        trailPoints.current[trailPoints.current.length - 1].y
      );

      gradient.addColorStop(0, 'rgba(107, 70, 193, 0)'); // STACKO purple fade
      gradient.addColorStop(0.2, 'rgba(139, 92, 246, 0.4)'); // Secondary purple
      gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.8)'); // Peak intensity
      gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.9)'); // White highlight
      gradient.addColorStop(1, 'rgba(255, 255, 255, 1)'); // Pure white

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    };

    const drawParticleEffect = (ctx: CanvasRenderingContext2D) => {
      // Draw particles along the trail
      for (let i = 0; i < trailPoints.current.length; i += 3) {
        const point = trailPoints.current[i];
        const age = (Date.now() - point.timestamp) / 1000;
        const opacity = Math.max(0, 1 - age);
        
        if (opacity > 0) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2 * opacity, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${opacity * 0.6})`;
          ctx.fill();
        }
      }
    };

    const drawGlowEffect = (ctx: CanvasRenderingContext2D) => {
      if (trailPoints.current.length === 0) return;
      
      const lastPoint = trailPoints.current[trailPoints.current.length - 1];
      
      // Create radial gradient for glow effect
      const glowGradient = ctx.createRadialGradient(
        lastPoint.x, lastPoint.y, 0,
        lastPoint.x, lastPoint.y, 30
      );
      
      glowGradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
      glowGradient.addColorStop(0.5, 'rgba(107, 70, 193, 0.1)');
      glowGradient.addColorStop(1, 'rgba(107, 70, 193, 0)');
      
      ctx.beginPath();
      ctx.arc(lastPoint.x, lastPoint.y, 30, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
    };

    document.addEventListener('mousemove', handleMouseMove);
    animationFrameId.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  if (!isEnabled.current) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
});

MouseTrail.displayName = 'MouseTrail';
export default MouseTrail;