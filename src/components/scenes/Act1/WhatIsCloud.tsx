'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { useAnimationSpeed } from '@/components/hooks/useAnimationSpeed';
import { narrations } from '@/lib/content';
import CloudIcon from '@/components/shared/CloudIcon';
import AnimatedCounter from '@/components/shared/AnimatedCounter';
import GlowBox from '@/components/shared/GlowBox';
import Narration from '@/components/shared/Narration';

// Orbiting icon SVGs
function ServerMini() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="4" y="3" width="20" height="22" rx="2" stroke="var(--accent-blue)" strokeWidth="1.5" fill="rgba(17,22,51,0.6)" />
      <rect x="7" y="7" width="14" height="4" rx="1" stroke="var(--accent-blue)" strokeWidth="0.8" />
      <rect x="7" y="14" width="14" height="4" rx="1" stroke="var(--accent-blue)" strokeWidth="0.8" />
      <circle cx="10" cy="9" r="1.2" fill="var(--accent-green)" />
      <circle cx="10" cy="16" r="1.2" fill="var(--accent-green)" />
    </svg>
  );
}

function DatabaseMini() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <ellipse cx="14" cy="8" rx="9" ry="4" stroke="var(--accent-purple)" strokeWidth="1.5" fill="rgba(17,22,51,0.6)" />
      <path d="M5 8v6c0 2.2 4 4 9 4s9-1.8 9-4V8" stroke="var(--accent-purple)" strokeWidth="1.5" />
      <path d="M5 14v6c0 2.2 4 4 9 4s9-1.8 9-4v-6" stroke="var(--accent-purple)" strokeWidth="1.5" />
    </svg>
  );
}

function GearMini() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--accent-amber)" strokeWidth="1.5">
      <circle cx="14" cy="14" r="4" />
      <path d="M14 3v3M14 22v3M3 14h3M22 14h3M6.1 6.1l2.1 2.1M19.8 19.8l2.1 2.1M6.1 21.9l2.1-2.1M19.8 8.2l2.1-2.1" />
    </svg>
  );
}

function CodeMini() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--accent-green)" strokeWidth="1.5">
      <path d="M10 8L5 14l5 6M18 8l5 6-5 6" />
    </svg>
  );
}

// Laptop SVG
function LaptopIcon() {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
      <rect x="15" y="4" width="50" height="36" rx="3" stroke="var(--accent-blue)" strokeWidth="1.5" fill="rgba(17,22,51,0.6)" />
      <rect x="20" y="9" width="40" height="26" rx="1" fill="rgba(96,165,250,0.08)" />
      <path d="M8 44h64l-4 8H12l-4-8z" stroke="var(--accent-blue)" strokeWidth="1.5" fill="rgba(17,22,51,0.6)" />
    </svg>
  );
}

const orbitIcons = [
  { component: ServerMini, angle: 0 },
  { component: DatabaseMini, angle: 90 },
  { component: GearMini, angle: 180 },
  { component: CodeMini, angle: 270 },
];

export default function WhatIsCloud() {
  const [phase, setPhase] = useState(0);
  const { scaledTimeout } = useAnimationSpeed();
  const setSceneStepHandler = useAppStore((s) => s.setSceneStepHandler);
  const setSceneStepBackHandler = useAppStore((s) => s.setSceneStepBackHandler);

  // Step handler: absorb presses during animation, pass through at end
  const handleStep = useCallback(() => {
    return phase < 3;
  }, [phase]);

  useEffect(() => {
    setSceneStepHandler(handleStep);
    setSceneStepBackHandler(null);
    return () => {
      setSceneStepHandler(null);
      setSceneStepBackHandler(null);
    };
  }, [setSceneStepHandler, setSceneStepBackHandler, handleStep]);

  // Auto-advance phases
  useEffect(() => {
    if (phase === 0) return scaledTimeout(() => setPhase(1), 2500);
  }, [phase, scaledTimeout]);

  useEffect(() => {
    if (phase === 1) return scaledTimeout(() => setPhase(2), 3000);
  }, [phase, scaledTimeout]);

  useEffect(() => {
    if (phase === 2) return scaledTimeout(() => setPhase(3), 3000);
  }, [phase, scaledTimeout]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Phase 0: Laptop with dotted line to cloud */}
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="laptop-cloud"
            className="flex flex-col items-center gap-4"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <CloudIcon size={100} glow />

            {/* Dotted line flowing upward */}
            <motion.svg width="4" height="80" viewBox="0 0 4 80" className="overflow-visible">
              <motion.line
                x1="2" y1="80" x2="2" y2="0"
                stroke="var(--accent-blue)"
                strokeWidth="2"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              {/* Flowing dots */}
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={i}
                  cx="2" cy="80" r="3"
                  fill="var(--accent-blue)"
                  animate={{ cy: [80, 0], opacity: [1, 0] }}
                  transition={{
                    duration: 1.5,
                    delay: 0.8 + i * 0.4,
                    repeat: Infinity,
                    ease: 'easeIn',
                  }}
                />
              ))}
            </motion.svg>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <LaptopIcon />
            </motion.div>

            <motion.p
              className="text-sm text-dim font-body mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Your device connects to the cloud
            </motion.p>
          </motion.div>
        )}

        {/* Phase 1: Cloud with orbiting icons */}
        {phase === 1 && (
          <motion.div
            key="orbit"
            className="relative flex items-center justify-center"
            style={{ width: 320, height: 320 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            transition={{ duration: 0.6 }}
          >
            <CloudIcon size={140} glow />

            {/* Orbit ring */}
            <motion.div
              className="absolute border border-white/10 rounded-full"
              style={{ width: 280, height: 280 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />

            {/* Orbiting icons */}
            {orbitIcons.map((icon, i) => (
              <motion.div
                key={i}
                className="absolute flex items-center justify-center w-10 h-10 rounded-full bg-void/80 border border-white/10"
                style={{ left: '50%', top: '50%', marginLeft: -20, marginTop: -20 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 360,
                }}
                transition={{
                  opacity: { delay: 0.5 + i * 0.2, duration: 0.4 },
                  scale: { delay: 0.5 + i * 0.2, duration: 0.4, type: 'spring' },
                  rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
                }}
              >
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  style={{
                    transform: `translateX(${Math.cos((icon.angle * Math.PI) / 180) * 140}px) translateY(${Math.sin((icon.angle * Math.PI) / 180) * 140}px)`,
                  }}
                >
                  <icon.component />
                </motion.div>
              </motion.div>
            ))}

            <motion.p
              className="absolute -bottom-12 text-lg text-white/80 font-body text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Servers, databases, tools, platforms &mdash; all in the cloud
            </motion.p>
          </motion.div>
        )}

        {/* Phase 2: Analogy comparison */}
        {phase === 2 && (
          <motion.div
            key="comparison"
            className="flex items-center gap-12 px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            {/* Left: generator (old way) */}
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <GlowBox color="#EF4444" className="w-64 flex flex-col items-center gap-4 py-6">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <rect x="12" y="18" width="40" height="32" rx="4" stroke="#EF4444" strokeWidth="2" fill="rgba(239,68,68,0.1)" />
                  <motion.path
                    d="M32 8v10M22 14l10-6 10 6"
                    stroke="#EF4444"
                    strokeWidth="2"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ transformOrigin: '32px 14px' }}
                  />
                  <circle cx="32" cy="34" r="8" stroke="#EF4444" strokeWidth="1.5" />
                  <motion.path
                    d="M28 34h8M32 30v8"
                    stroke="#EF4444"
                    strokeWidth="1.5"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: '32px 34px' }}
                  />
                </svg>
                <p className="text-red-400 font-display text-sm text-center">Build your own<br />power plant</p>
                <p className="text-dim text-xs text-center font-body">Expensive, complex, wasteful</p>
              </GlowBox>
            </motion.div>

            {/* VS divider */}
            <motion.span
              className="text-2xl font-display text-dim"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              vs
            </motion.span>

            {/* Right: plug into socket (new way) */}
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            >
              <GlowBox color="#22C55E" className="w-64 flex flex-col items-center gap-4 py-6">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <rect x="20" y="22" width="24" height="20" rx="3" stroke="#22C55E" strokeWidth="2" fill="rgba(34,197,94,0.1)" />
                  <rect x="26" y="28" width="4" height="8" rx="1" fill="#22C55E" opacity="0.6" />
                  <rect x="34" y="28" width="4" height="8" rx="1" fill="#22C55E" opacity="0.6" />
                  <motion.path
                    d="M32 10v12"
                    stroke="#22C55E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                  <motion.circle
                    cx="32" cy="10" r="3"
                    fill="#22C55E"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ delay: 1.4, duration: 1, repeat: Infinity }}
                  />
                </svg>
                <p className="text-green-400 font-display text-sm text-center">Plug into<br />the grid</p>
                <p className="text-dim text-xs text-center font-body">On-demand, scalable, efficient</p>
              </GlowBox>
            </motion.div>
          </motion.div>
        )}

        {/* Phase 3: Stats + narration */}
        {phase === 3 && (
          <motion.div
            key="stats"
            className="flex flex-col items-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.h2
              className="text-3xl font-display text-white/90"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Cloud Computing Today
            </motion.h2>

            <div className="flex gap-16">
              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <GlowBox color="var(--accent-blue)" pulse className="px-8 py-6 flex flex-col items-center">
                  <AnimatedCounter
                    value={600}
                    prefix="$"
                    suffix="B+"
                    delay={0.5}
                    className="text-5xl text-accent-blue"
                  />
                  <p className="text-sm text-dim mt-2 font-body">Global Market Size</p>
                </GlowBox>
              </motion.div>

              <motion.div
                className="flex flex-col items-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                <GlowBox color="var(--accent-green)" pulse className="px-8 py-6 flex flex-col items-center">
                  <AnimatedCounter
                    value={94}
                    suffix="%"
                    delay={0.7}
                    className="text-5xl text-accent-green"
                  />
                  <p className="text-sm text-dim mt-2 font-body">Enterprise Adoption</p>
                </GlowBox>
              </motion.div>
            </div>

            <Narration text={narrations.scene2} delay={1.2} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
