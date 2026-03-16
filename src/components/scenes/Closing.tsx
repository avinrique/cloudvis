'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationSpeed } from '@/components/hooks/useAnimationSpeed';
import { useTypewriter } from '@/components/hooks/useTypewriter';
import { narrations } from '@/lib/content';
import { scaleIn } from '@/lib/animations';
import CloudIcon from '@/components/shared/CloudIcon';
import Narration from '@/components/shared/Narration';

// Small icon shapes representing previous scenes
const SCENE_ICONS = [
  { shape: 'server', color: '#60A5FA', x: -180, y: -120 },
  { shape: 'timeline', color: '#A78BFA', x: 160, y: -100 },
  { shape: 'layers', color: '#34D399', x: -140, y: 80 },
  { shape: 'shield', color: '#FBBF24', x: 120, y: 110 },
  { shape: 'scale', color: '#F87171', x: -200, y: 10 },
  { shape: 'chart', color: '#22D3EE', x: 190, y: -20 },
  { shape: 'code', color: '#C084FC', x: -60, y: -160 },
  { shape: 'globe', color: '#2DD4BF', x: 60, y: 150 },
];

function MiniIcon({ shape, color }: { shape: string; color: string }) {
  switch (shape) {
    case 'server':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="3" width="16" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
          <rect x="4" y="14" width="16" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
          <circle cx="7" cy="6.5" r="1" fill={color} />
          <circle cx="7" cy="17.5" r="1" fill={color} />
        </svg>
      );
    case 'timeline':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth="1.5" />
          {[6, 10, 14, 18].map((cx) => (
            <circle key={cx} cx={cx} cy="12" r="2" fill={color} />
          ))}
        </svg>
      );
    case 'layers':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 3L3 8l9 5 9-5-9-5z" stroke={color} strokeWidth="1.5" />
          <path d="M3 12l9 5 9-5" stroke={color} strokeWidth="1.5" />
          <path d="M3 16l9 5 9-5" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'shield':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 3l8 4v5c0 4.5-3.5 8.5-8 10-4.5-1.5-8-5.5-8-10V7l8-4z" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'scale':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line x1="12" y1="3" x2="12" y2="21" stroke={color} strokeWidth="1.5" />
          <line x1="4" y1="7" x2="20" y2="7" stroke={color} strokeWidth="1.5" />
          <path d="M4 7l3 6H1l3-6z" stroke={color} strokeWidth="1" />
          <path d="M20 7l3 6h-6l3-6z" stroke={color} strokeWidth="1" />
        </svg>
      );
    case 'chart':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" />
          <path d="M12 4v8l5.6 5.6" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'code':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <polyline points="8,6 2,12 8,18" stroke={color} strokeWidth="1.5" fill="none" />
          <polyline points="16,6 22,12 16,18" stroke={color} strokeWidth="1.5" fill="none" />
          <line x1="14" y1="4" x2="10" y2="20" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'globe':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="4" ry="9" stroke={color} strokeWidth="1" />
          <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="1" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Closing() {
  const [phase, setPhase] = useState(0);
  const { scaledTimeout } = useAnimationSpeed();

  // Typewriter for market stat
  const { displayText: statText, isComplete: statDone } = useTypewriter({
    text: '$600B+ and growing',
    speed: 55,
    delay: 300,
    enabled: phase >= 2,
  });

  // Auto-advance
  useEffect(() => {
    return scaledTimeout(() => setPhase(1), 2500);
  }, [scaledTimeout]);

  useEffect(() => {
    if (phase === 1) {
      return scaledTimeout(() => setPhase(2), 2000);
    }
  }, [phase, scaledTimeout]);

  useEffect(() => {
    if (phase === 2 && statDone) {
      return scaledTimeout(() => setPhase(3), 1200);
    }
  }, [phase, statDone, scaledTimeout]);

  useEffect(() => {
    if (phase === 3) {
      return scaledTimeout(() => setPhase(4), 2500);
    }
  }, [phase, scaledTimeout]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Phase 0: Icons scattered, then converge in phase 1 */}
      {SCENE_ICONS.map((icon, i) => (
        <motion.div
          key={icon.shape}
          className="absolute"
          style={{ zIndex: 10 }}
          initial={{
            x: icon.x,
            y: icon.y,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: phase >= 1 ? 0 : icon.x,
            y: phase >= 1 ? 0 : icon.y,
            opacity: phase >= 1 && phase < 2 ? [1, 1, 0] : phase < 1 ? 1 : 0,
            scale: phase >= 1 ? [1, 0.5, 0] : 1,
          }}
          transition={{
            duration: phase >= 1 ? 1.2 : 0.6,
            delay: phase < 1 ? i * 0.12 : i * 0.06,
            type: 'spring',
            stiffness: 120,
            damping: 14,
          }}
        >
          <MiniIcon shape={icon.shape} color={icon.color} />
        </motion.div>
      ))}

      {/* Phase 1+: Cloud icon assembles at center */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="flex flex-col items-center gap-6"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              animate={
                phase >= 2
                  ? {
                      scale: [1, 1.08, 1],
                      filter: [
                        'drop-shadow(0 0 10px rgba(96,165,250,0.3))',
                        'drop-shadow(0 0 30px rgba(96,165,250,0.6))',
                        'drop-shadow(0 0 10px rgba(96,165,250,0.3))',
                      ],
                    }
                  : {}
              }
              transition={phase >= 2 ? { duration: 2, repeat: Infinity } : {}}
            >
              <CloudIcon size={150} glow />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Market stat typewriter */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p
              className="text-2xl md:text-3xl font-display font-bold tracking-wide text-center"
              style={{
                color: 'var(--accent-blue)',
                textShadow: '0 0 20px rgba(96,165,250,0.4)',
              }}
            >
              {statText}
              <motion.span
                className="text-accent-blue"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3: Title with gold glow */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            className="flex flex-col items-center gap-3 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-4xl md:text-6xl font-display font-bold tracking-wider text-center"
              style={{
                color: '#FFD700',
                textShadow:
                  '0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,215,0,0.2), 0 0 60px rgba(255,215,0,0.1)',
              }}
            >
              Cloud Computing
            </h1>
            <motion.p
              className="text-xl md:text-2xl font-body tracking-widest flex items-center gap-1"
              style={{ color: 'rgba(255,215,0,0.8)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Start Building.
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 4: Credits */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.div
            className="absolute bottom-20 flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="w-16 h-px bg-white/10 mb-2" />
            <p className="text-sm font-body text-dim tracking-widest uppercase">
              SVIT College
            </p>
            <p
              className="text-base font-display tracking-wide"
              style={{ color: 'rgba(255,215,0,0.7)' }}
            >
              Abhinav Gupta
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Narration */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="absolute bottom-6 left-0 right-0 flex justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Narration text={narrations.scene12} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
