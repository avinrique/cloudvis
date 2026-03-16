'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationSpeed } from '@/components/hooks/useAnimationSpeed';
import { narrations, advantages, limitations, stats } from '@/lib/content';
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/animations';
import BalanceScale from '@/components/shared/BalanceScale';
import Narration from '@/components/shared/Narration';

export default function ProsAndCons() {
  const [phase, setPhase] = useState(0);
  const { scaledTimeout } = useAnimationSpeed();

  // Auto-advance through phases
  useEffect(() => {
    return scaledTimeout(() => setPhase(1), 1800);
  }, [scaledTimeout]);

  useEffect(() => {
    if (phase === 1) {
      return scaledTimeout(() => setPhase(2), 3500);
    }
  }, [phase, scaledTimeout]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-6 gap-6">
      {/* Phase 0: Title */}
      <AnimatePresence>
        {phase >= 0 && (
          <motion.div
            className="flex flex-col items-center gap-2"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-display font-bold tracking-wide"
              style={{
                color: 'var(--accent-amber)',
                textShadow: '0 0 30px rgba(251,191,36,0.4)',
              }}
            >
              The Balance
            </motion.h2>
            <motion.p
              className="text-dim text-sm md:text-base font-body tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Advantages vs Limitations
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1: Balance Scale */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="w-full max-w-3xl"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
          >
            <BalanceScale
              leftItems={advantages}
              rightItems={limitations}
              leftColor="var(--accent-green)"
              rightColor="var(--accent-amber)"
              leftLabel="Advantages"
              rightLabel="Limitations"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1: Advantage and Limitation pills */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="flex flex-col md:flex-row gap-8 w-full max-w-4xl mt-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Advantages column */}
            <motion.div className="flex-1 flex flex-col gap-2" variants={staggerContainer}>
              {advantages.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-body"
                  style={{
                    background: 'rgba(74, 222, 128, 0.08)',
                    border: '1px solid rgba(74, 222, 128, 0.2)',
                    color: 'var(--accent-green)',
                  }}
                  variants={fadeInUp}
                >
                  <span className="text-xs">+</span>
                  {item}
                </motion.div>
              ))}
            </motion.div>

            {/* Limitations column */}
            <motion.div className="flex-1 flex flex-col gap-2" variants={staggerContainer}>
              {limitations.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-body"
                  style={{
                    background: 'rgba(251, 191, 36, 0.08)',
                    border: '1px solid rgba(251, 191, 36, 0.2)',
                    color: 'var(--accent-amber)',
                  }}
                  variants={fadeInUp}
                >
                  <span className="text-xs">-</span>
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Stat badge */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div
              className="px-6 py-3 rounded-2xl font-display text-lg md:text-xl font-bold tracking-wide"
              style={{
                background: 'linear-gradient(135deg, rgba(74,222,128,0.12), rgba(96,165,250,0.12))',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                color: 'var(--accent-green)',
                boxShadow: '0 0 25px rgba(74, 222, 128, 0.15)',
              }}
            >
              20-30% Average Cost Savings
            </div>
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
            <Narration text={narrations.scene9} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
