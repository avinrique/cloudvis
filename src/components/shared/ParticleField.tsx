'use client';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  spread?: number;
  className?: string;
  mode?: 'float' | 'confetti' | 'converge';
}

export default function ParticleField({
  count = 30,
  color = 'var(--accent-blue)',
  spread = 400,
  className = '',
  mode = 'float',
}: ParticleFieldProps) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
    })),
    [count, spread]
  );

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: color,
            left: '50%',
            top: '50%',
            boxShadow: `0 0 ${p.size * 2}px ${color}`,
          }}
          initial={{
            x: mode === 'converge' ? p.x : 0,
            y: mode === 'converge' ? p.y : 0,
            opacity: 0,
            scale: 0,
          }}
          animate={
            mode === 'float'
              ? {
                  x: [0, p.x * 0.5, p.x, p.x * 0.5, 0],
                  y: [0, p.y * 0.5, p.y, p.y * 0.5, 0],
                  opacity: [0, 0.8, 0.6, 0.8, 0],
                  scale: [0, 1, 0.8, 1, 0],
                }
              : mode === 'confetti'
              ? {
                  x: p.x,
                  y: p.y + spread,
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1, 1, 0],
                  rotate: Math.random() * 720,
                }
              : {
                  x: 0,
                  y: 0,
                  opacity: [0, 1, 1],
                  scale: [0, 1.5, 1],
                }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: mode === 'float' ? Infinity : 0,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
