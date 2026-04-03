'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { useAnimationSpeed } from '@/components/hooks/useAnimationSpeed';
import { useTypewriter } from '@/components/hooks/useTypewriter';
import { narrations } from '@/lib/content';
import ServerIcon from '@/components/shared/ServerIcon';
import CloudIcon from '@/components/shared/CloudIcon';
import ParticleField from '@/components/shared/ParticleField';
import Narration from '@/components/shared/Narration';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';

const TITLE = 'DEEP DIVE';

export default function Opening() {
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);
  const { scaledTimeout } = useAnimationSpeed();
  const setSceneStepHandler = useAppStore((s) => s.setSceneStepHandler);
  const setSceneStepBackHandler = useAppStore((s) => s.setSceneStepBackHandler);

  // Keep ref in sync
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Typewriter for phase 1
  const { displayText, isComplete: typewriterDone } = useTypewriter({
    text: 'What if you could access unlimited computing power...',
    speed: 45,
    delay: 300,
    enabled: phase >= 1,
  });

  // Step handler: first press starts animation, after phase 6 let navigation through
  const handleStep = useCallback(() => {
    if (phaseRef.current === 0) {
      setPhase(1);
      return true;
    }
    if (phaseRef.current < 6) {
      return true; // absorb presses during animation
    }
    return false; // let parent navigate to next scene
  }, []);

  const handleStepBack = useCallback(() => {
    if (phaseRef.current > 0) {
      return true; // absorb back presses during animation
    }
    return false;
  }, []);

  useEffect(() => {
    setSceneStepHandler(handleStep);
    setSceneStepBackHandler(handleStepBack);
    return () => {
      setSceneStepHandler(null);
      setSceneStepBackHandler(null);
    };
  }, [setSceneStepHandler, setSceneStepBackHandler, handleStep, handleStepBack]);

  // Auto-progress through phases after typewriter completes
  useEffect(() => {
    if (phase === 1 && typewriterDone) {
      return scaledTimeout(() => setPhase(2), 800);
    }
  }, [phase, typewriterDone, scaledTimeout]);

  useEffect(() => {
    if (phase === 2) return scaledTimeout(() => setPhase(3), 2400);
  }, [phase, scaledTimeout]);

  useEffect(() => {
    if (phase === 3) return scaledTimeout(() => setPhase(4), 2200);
  }, [phase, scaledTimeout]);

  useEffect(() => {
    if (phase === 4) return scaledTimeout(() => setPhase(5), 1600);
  }, [phase, scaledTimeout]);

  useEffect(() => {
    if (phase === 5) return scaledTimeout(() => setPhase(6), 1800);
  }, [phase, scaledTimeout]);

  // Server grid positions (3x3)
  const serverPositions = Array.from({ length: 9 }, (_, i) => ({
    row: Math.floor(i / 3),
    col: i % 3,
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Phase 0: Blinking cursor */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            className="flex flex-col items-center gap-8"
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="text-4xl font-mono text-accent-blue"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              _
            </motion.span>
            <InteractiveIndicator className="mt-8" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1: Typewriter text */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-8"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <p className="text-3xl md:text-4xl font-body text-white/90 text-center max-w-3xl leading-relaxed">
              {displayText}
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

      {/* Phase 2: Server grid */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            className="grid grid-cols-3 gap-6"
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)', transition: { duration: 0.6 } }}
          >
            {serverPositions.map((pos, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: (pos.row * 3 + pos.col) * 0.15,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <ServerIcon size={50} blinkLeds />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3: Particles converging */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <ParticleField count={40} color="var(--accent-blue)" spread={500} mode="converge" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 4: Cloud icon reforms */}
      <AnimatePresence>
        {phase >= 4 && phase < 5 && (
          <motion.div
            className="flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.6, transition: { duration: 0.6 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <CloudIcon size={180} glow />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 5+: Title with letter-drop */}
      <AnimatePresence>
        {phase >= 5 && (
          <motion.div className="flex flex-col items-center gap-6">
            <CloudIcon size={120} glow className="mb-2" />
            <div className="flex gap-1">
              {TITLE.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-5xl md:text-7xl font-display font-bold tracking-wider"
                  style={{
                    color: 'var(--accent-blue)',
                    textShadow: '0 0 30px rgba(96,165,250,0.6)',
                  }}
                  initial={{ y: -80, opacity: 0 }}
                  animate={{ y: 0, opacity: letter === ' ' ? 0 : 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 18,
                    delay: i * 0.06,
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>

            {/* Phase 6: Subtitle + narration */}
            {phase >= 6 && (
              <>
                <motion.p
                  className="text-lg md:text-xl text-dim font-body tracking-widest"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Session 2: Cloud Infrastructure
                </motion.p>
                <Narration text={narrations.scene1} delay={0.6} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
