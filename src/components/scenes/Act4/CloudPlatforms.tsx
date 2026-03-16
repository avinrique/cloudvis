'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationSpeed } from '@/components/hooks/useAnimationSpeed';
import { narrations, cloudPlatforms } from '@/lib/content';
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/animations';
import PieChart from '@/components/shared/PieChart';
import Narration from '@/components/shared/Narration';

const DATA_CENTER_DOTS = [
  { top: '25%', left: '22%' },  // US West
  { top: '28%', left: '30%' },  // US East
  { top: '32%', left: '48%' },  // Europe
  { top: '22%', left: '55%' },  // Northern Europe
  { top: '42%', left: '60%' },  // Middle East
  { top: '35%', left: '72%' },  // India
  { top: '30%', left: '80%' },  // East Asia
  { top: '60%', left: '78%' },  // Australia
  { top: '55%', left: '42%' },  // Africa
  { top: '50%', left: '33%' },  // South America
];

export default function CloudPlatforms() {
  const [phase, setPhase] = useState(0);
  const { scaledTimeout } = useAnimationSpeed();

  // Auto-advance
  useEffect(() => {
    return scaledTimeout(() => setPhase(1), 2500);
  }, [scaledTimeout]);

  useEffect(() => {
    if (phase === 1) {
      return scaledTimeout(() => setPhase(2), 3000);
    }
  }, [phase, scaledTimeout]);

  const pieSlices = cloudPlatforms.map((p) => ({
    label: `${p.name} (${p.share}%)`,
    value: p.share,
    color: p.color,
  }));

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-6 gap-6">
      {/* Phase 0: Globe */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
            transition={{ type: 'spring', stiffness: 150, damping: 18 }}
          >
            {/* Globe */}
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 40% 35%, rgba(96,165,250,0.15), rgba(10,14,39,0.9))',
                border: '2px solid rgba(96,165,250,0.3)',
                boxShadow: '0 0 40px rgba(96,165,250,0.15), inset 0 0 30px rgba(96,165,250,0.05)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              {/* Latitude lines */}
              {[25, 50, 75].map((top) => (
                <div
                  key={`lat-${top}`}
                  className="absolute w-full left-0"
                  style={{
                    top: `${top}%`,
                    height: '1px',
                    background: 'rgba(96,165,250,0.15)',
                  }}
                />
              ))}
              {/* Longitude lines (ellipses) */}
              {[-30, 0, 30, 60].map((tilt) => (
                <div
                  key={`lng-${tilt}`}
                  className="absolute top-0 left-1/2 h-full"
                  style={{
                    width: '100%',
                    transform: `translateX(-50%) scaleX(${Math.cos((tilt * Math.PI) / 180) * 0.4 + 0.1})`,
                    borderRadius: '50%',
                    border: '1px solid rgba(96,165,250,0.12)',
                  }}
                />
              ))}

              {/* Data center dots */}
              {DATA_CENTER_DOTS.map((dot, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    top: dot.top,
                    left: dot.left,
                    background: 'var(--accent-blue)',
                    boxShadow: '0 0 8px rgba(96,165,250,0.8)',
                  }}
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            <motion.p
              className="absolute -bottom-8 text-dim font-body text-sm tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Global Cloud Infrastructure
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1+: Pie Chart and Title */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="flex flex-col items-center gap-4"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-display font-bold tracking-wide mb-2"
              style={{
                color: 'var(--accent-blue)',
                textShadow: '0 0 25px rgba(96,165,250,0.4)',
              }}
            >
              Cloud Market Share
            </motion.h2>

            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              <PieChart slices={pieSlices} size={200} animate />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Platform cards */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {cloudPlatforms.map((platform, i) => (
              <motion.div
                key={platform.name}
                className="relative rounded-xl overflow-hidden p-4 flex flex-col gap-2"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${platform.color}33`,
                }}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 20px ${platform.color}30`,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Color bar */}
                <div
                  className="absolute top-0 left-0 w-full h-1"
                  style={{ background: platform.color }}
                />

                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-xl font-display font-bold"
                    style={{ color: platform.color }}
                  >
                    {platform.name}
                  </span>
                  <span
                    className="text-xs font-mono px-1.5 py-0.5 rounded-full"
                    style={{
                      background: `${platform.color}15`,
                      color: platform.color,
                    }}
                  >
                    {platform.share}%
                  </span>
                </div>

                <p className="text-xs text-dim font-body leading-relaxed">
                  {platform.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Narration */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Narration text={narrations.scene10} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
