'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { useAnimationSpeed } from '@/components/hooks/useAnimationSpeed';
import { narrations } from '@/lib/content';
import ServerIcon from '@/components/shared/ServerIcon';
import CloudIcon from '@/components/shared/CloudIcon';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import GlowBox from '@/components/shared/GlowBox';
import Narration from '@/components/shared/Narration';

function DollarSigns() {
  return (
    <motion.div className="flex gap-1">
      {['$', '$', '$'].map((s, i) => (
        <motion.span
          key={i}
          className="text-2xl font-display text-red-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.15 }}
        >
          {s}
        </motion.span>
      ))}
    </motion.div>
  );
}

function ScalingArrows() {
  return (
    <motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.8, type: 'spring' }}
    >
      {/* Up-right arrow */}
      <motion.path
        d="M16 32L32 16M32 16v10M32 16H22"
        stroke="var(--accent-blue)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      />
      {/* Down-left arrow */}
      <motion.path
        d="M32 16L16 32M16 32v-10M16 32h10"
        stroke="var(--accent-blue)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
    </motion.svg>
  );
}

// Fixed bar (traditional)
function FixedBar() {
  return (
    <div className="w-full mt-4">
      <motion.div
        className="h-4 rounded-full overflow-hidden bg-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #EF4444, #DC2626)' }}
          initial={{ width: '0%' }}
          animate={{ width: '80%' }}
          transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
        />
      </motion.div>
      <motion.p
        className="text-xs text-red-400/60 mt-1 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Fixed capacity — pay even when idle
      </motion.p>
    </div>
  );
}

// Growing bar (cloud)
function GrowingBar() {
  return (
    <div className="w-full mt-4">
      <motion.div
        className="h-4 rounded-full overflow-hidden bg-white/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #3B82F6, #60A5FA)' }}
          initial={{ width: '0%' }}
          animate={{ width: ['20%', '60%', '40%', '80%', '50%'] }}
          transition={{ delay: 1.4, duration: 4, ease: 'easeInOut', repeat: Infinity }}
        />
      </motion.div>
      <motion.p
        className="text-xs text-blue-400/60 mt-1 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Elastic — scales with demand
      </motion.p>
    </div>
  );
}

export default function TraditionalVsCloud() {
  const [phase, setPhase] = useState(0);
  const [dividerShift, setDividerShift] = useState(false);
  const { scaledTimeout } = useAnimationSpeed();
  const setSceneStepHandler = useAppStore((s) => s.setSceneStepHandler);
  const setSceneStepBackHandler = useAppStore((s) => s.setSceneStepBackHandler);

  const handleStep = useCallback(() => {
    return phase < 2;
  }, [phase]);

  useEffect(() => {
    setSceneStepHandler(handleStep);
    setSceneStepBackHandler(null);
    return () => {
      setSceneStepHandler(null);
      setSceneStepBackHandler(null);
    };
  }, [setSceneStepHandler, setSceneStepBackHandler, handleStep]);

  // Auto-progress
  useEffect(() => {
    if (phase === 0) return scaledTimeout(() => setPhase(1), 3500);
  }, [phase, scaledTimeout]);

  useEffect(() => {
    if (phase === 1) return scaledTimeout(() => setPhase(2), 2500);
  }, [phase, scaledTimeout]);

  // Divider animation at end of phase 1
  useEffect(() => {
    if (phase === 1) return scaledTimeout(() => setDividerShift(true), 1800);
  }, [phase, scaledTimeout]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Title */}
      <motion.h2
        className="absolute top-12 text-3xl md:text-4xl font-display text-white/90"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Traditional vs Cloud
      </motion.h2>

      {/* Split screen container */}
      <div className="flex w-full max-w-5xl h-[400px] relative mt-8">
        {/* Left: Traditional (red-tinted) */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center gap-4 px-8 relative"
          style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.06), rgba(239,68,68,0.02))' }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="text-sm font-display text-red-400/60 tracking-widest uppercase mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Traditional
          </motion.span>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            <ServerIcon size={60} color="#EF4444" blinkLeds />
          </motion.div>

          <DollarSigns />

          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-red-400 font-display text-lg">12-18 months</span>
            <span className="text-xs text-dim font-body">to provision</span>
          </motion.div>

          <FixedBar />
        </motion.div>

        {/* Center divider */}
        <motion.div
          className="w-[2px] relative z-10 flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
          animate={{
            x: dividerShift ? -60 : 0,
          }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute bg-void px-3 py-1 rounded-full border border-white/20 text-sm text-dim font-display"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring' }}
          >
            VS
          </motion.div>
        </motion.div>

        {/* Right: Cloud (blue-tinted) */}
        <motion.div
          className="flex-1 flex flex-col items-center justify-center gap-4 px-8 relative"
          style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(59,130,246,0.02))' }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.span
            className="text-sm font-display text-blue-400/60 tracking-widest uppercase mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Cloud
          </motion.span>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          >
            <CloudIcon size={80} color="var(--accent-blue)" glow />
          </motion.div>

          <ScalingArrows />

          <motion.div
            className="flex flex-col items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <span className="text-blue-400 font-display text-lg">Pay per use</span>
            <span className="text-xs text-dim font-body">scale in minutes</span>
          </motion.div>

          <GrowingBar />

          {/* "Winner" glow at end */}
          {dividerShift && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{
                background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.08) 0%, transparent 70%)',
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Phase 1: Cost savings stat */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="absolute bottom-32 flex items-center gap-3"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <GlowBox color="var(--accent-green)" pulse className="px-6 py-3 flex items-center gap-3">
              <span className="text-dim font-body text-sm">Average savings:</span>
              <AnimatedCounter
                value={50}
                prefix="30-"
                suffix="%"
                duration={1.5}
                className="text-3xl text-accent-green font-display"
              />
              <span className="text-dim font-body text-sm">cost reduction</span>
            </GlowBox>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Narration */}
      {phase >= 2 && (
        <Narration text={narrations.scene4} delay={0.3} />
      )}
    </div>
  );
}
