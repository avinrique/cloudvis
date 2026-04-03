'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
}

interface GridLine {
  pos: number;
  opacity: number;
  speed: number;
}

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    // Particles
    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2 - 0.1,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      hue: 200 + Math.random() * 40,
    }));

    // Grid lines (horizontal)
    const hLines: GridLine[] = Array.from({ length: 12 }, (_, i) => ({
      pos: (i / 12) * h,
      opacity: 0.03 + Math.random() * 0.02,
      speed: 0.1 + Math.random() * 0.15,
    }));

    // Grid lines (vertical)
    const vLines: GridLine[] = Array.from({ length: 16 }, (_, i) => ({
      pos: (i / 16) * w,
      opacity: 0.02 + Math.random() * 0.02,
      speed: 0.05 + Math.random() * 0.1,
    }));

    let time = 0;

    function draw() {
      time += 0.016;
      ctx.clearRect(0, 0, w, h);

      // Radial gradient vignette
      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7);
      grad.addColorStop(0, 'rgba(10, 14, 39, 0)');
      grad.addColorStop(0.6, 'rgba(10, 14, 39, 0)');
      grad.addColorStop(1, 'rgba(10, 14, 39, 0.4)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Moving grid lines - horizontal
      ctx.lineWidth = 0.5;
      for (const line of hLines) {
        line.pos += line.speed;
        if (line.pos > h) line.pos = -1;
        const wave = Math.sin(time * 0.5 + line.pos * 0.01) * 0.01;
        ctx.strokeStyle = `rgba(96, 165, 250, ${line.opacity + wave})`;
        ctx.beginPath();
        ctx.moveTo(0, line.pos);
        ctx.lineTo(w, line.pos);
        ctx.stroke();
      }

      // Moving grid lines - vertical
      for (const line of vLines) {
        line.pos += line.speed;
        if (line.pos > w) line.pos = -1;
        const wave = Math.sin(time * 0.3 + line.pos * 0.008) * 0.01;
        ctx.strokeStyle = `rgba(96, 165, 250, ${line.opacity + wave})`;
        ctx.beginPath();
        ctx.moveTo(line.pos, 0);
        ctx.lineTo(line.pos, h);
        ctx.stroke();
      }

      // Floating particles with glow
      for (const p of particles) {
        p.x += p.vx + Math.sin(time * 0.5 + p.y * 0.005) * 0.15;
        p.y += p.vy + Math.cos(time * 0.3 + p.x * 0.005) * 0.1;

        // Wrap around
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Pulsing opacity
        const pulse = Math.sin(time * 1.5 + p.x * 0.01) * 0.15;
        const alpha = Math.max(0, p.opacity + pulse);

        // Glow
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
        glowGrad.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${alpha * 0.6})`);
        glowGrad.addColorStop(1, `hsla(${p.hue}, 80%, 70%, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.fillRect(p.x - p.size * 6, p.y - p.size * 6, p.size * 12, p.size * 12);

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 80%, ${alpha})`;
        ctx.fill();
      }

      // Connection lines between nearby particles
      ctx.lineWidth = 0.3;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.08;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Slow ambient color wash
      const washAlpha = (Math.sin(time * 0.15) + 1) * 0.015;
      const washGrad = ctx.createRadialGradient(
        w * 0.3 + Math.sin(time * 0.1) * w * 0.2,
        h * 0.4 + Math.cos(time * 0.08) * h * 0.2,
        0,
        w / 2, h / 2, w * 0.6
      );
      washGrad.addColorStop(0, `rgba(139, 92, 246, ${washAlpha})`);
      washGrad.addColorStop(1, 'rgba(139, 92, 246, 0)');
      ctx.fillStyle = washGrad;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(draw);
    }

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    window.addEventListener('resize', handleResize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
