'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { useAnimationSpeed } from '@/components/hooks/useAnimationSpeed';
import { useTypewriter } from '@/components/hooks/useTypewriter';
import { narrations } from '@/lib/content';
import ServerIcon from '@/components/shared/ServerIcon';
import CloudIcon from '@/components/shared/CloudIcon';
import Narration from '@/components/shared/Narration';

const TITLE = 'DEEP DIVE';

export default function Opening() {
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);
  const { scaledTimeout } = useAnimationSpeed();
  const setSceneStepHandler = useAppStore((s) => s.setSceneStepHandler);
  const setSceneStepBackHandler = useAppStore((s) => s.setSceneStepBackHandler);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const { displayText, isComplete: typewriterDone } = useTypewriter({
    text: 'You know the basics — now let\'s go deeper...',
    speed: 40,
    delay: 300,
    enabled: phase >= 1,
  });

  const handleStep = useCallback(() => {
    if (phaseRef.current === 0) {
      setPhase(1);
      return true;
    }
    if (phaseRef.current < 6) {
      return true;
    }
    return false;
  }, []);

  const handleStepBack = useCallback(() => {
    if (phaseRef.current > 0) {
      return true;
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

  // Auto-start after 2 seconds
  useEffect(() => {
    return scaledTimeout(() => {
      if (phaseRef.current === 0) setPhase(1);
    }, 2000);
  }, [scaledTimeout]);

  // Auto-progress
  useEffect(() => {
    if (phase === 1 && typewriterDone) {
      return scaledTimeout(() => setPhase(2), 600);
    }
  }, [phase, typewriterDone, scaledTimeout]);

  useEffect(() => {
    if (phase === 2) return scaledTimeout(() => setPhase(3), 2000);
  }, [phase, scaledTimeout]);

  useEffect(() => {
    if (phase === 3) return scaledTimeout(() => setPhase(4), 1800);
  }, [phase, scaledTimeout]);

  useEffect(() => {
    if (phase === 4) return scaledTimeout(() => setPhase(5), 1400);
  }, [phase, scaledTimeout]);

  useEffect(() => {
    if (phase === 5) return scaledTimeout(() => setPhase(6), 1600);
  }, [phase, scaledTimeout]);

  const serverPositions = Array.from({ length: 9 }, (_, i) => ({
    row: Math.floor(i / 3),
    col: i % 3,
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Phase 0: Breathing cursor with ambient glow */}
      <AnimatePresence>
        {phase === 0 && (
          <motion.div
            className="flex flex-col items-center gap-8"
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="relative">
              <motion.span
                className="text-5xl font-code text-accent-blue block"
                animate={{
                  opacity: [1, 0.3, 1],
                  textShadow: [
                    '0 0 20px rgba(0,191,255,0.4)',
                    '0 0 40px rgba(0,191,255,0.8)',
                    '0 0 20px rgba(0,191,255,0.4)',
                  ],
                }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                _
              </motion.span>
              {/* Ambient ring pulse */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ width: 80, height: 80, left: -25, top: -15 }}
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(0,191,255,0)',
                    '0 0 0 30px rgba(0,191,255,0.05)',
                    '0 0 0 60px rgba(0,191,255,0)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs text-dim font-body">Press any key or wait</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1: Typewriter with cinematic blur-in */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-8"
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -40, filter: 'blur(12px)', scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-3xl md:text-4xl font-body text-white/90 text-center max-w-3xl leading-relaxed">
              {displayText}
              <motion.span
                className="text-accent-blue ml-0.5"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Server grid with staggered 3D entrance */}
      <AnimatePresence>
        {phase === 2 && (
          <motion.div
            className="grid grid-cols-3 gap-6"
            exit={{ opacity: 0, scale: 0.6, filter: 'blur(16px)', rotateX: 15, transition: { duration: 0.7 } }}
          >
            {serverPositions.map((pos, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0, rotateY: -90 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{
                  delay: (pos.row * 3 + pos.col) * 0.1,
                  type: 'spring',
                  stiffness: 200,
                  damping: 18,
                }}
                style={{ perspective: 600 }}
              >
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                >
                  <ServerIcon size={50} blinkLeds />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3: Particles converging with energy trails */}
      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {/* Energy ring */}
            <motion.div
              className="absolute"
              style={{ width: 200, height: 200, borderRadius: '50%' }}
              initial={{ scale: 3, opacity: 0, border: '1px solid rgba(0,191,255,0.1)' }}
              animate={{
                scale: [3, 1, 0.5],
                opacity: [0, 0.5, 0],
                border: ['1px solid rgba(0,191,255,0.1)', '2px solid rgba(0,191,255,0.4)', '1px solid rgba(0,191,255,0)'],
              }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Converging dots */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i / 24) * Math.PI * 2;
              const radius = 250;
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: `hsl(${200 + i * 5}, 80%, 70%)`,
                    boxShadow: `0 0 12px hsl(${200 + i * 5}, 80%, 60%)`,
                  }}
                  initial={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.5, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 4: Cloud icon materializes with shockwave */}
      <AnimatePresence>
        {phase >= 4 && phase < 5 && (
          <motion.div
            className="flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, y: -80, scale: 0.5, filter: 'blur(8px)', transition: { duration: 0.6 } }}
            transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.8 }}
          >
            {/* Shockwave ring */}
            <motion.div
              className="absolute rounded-full"
              style={{ width: 180, height: 180 }}
              initial={{ scale: 0, opacity: 0.5, boxShadow: '0 0 0 2px rgba(0,191,255,0.5)' }}
              animate={{
                scale: [0, 3],
                opacity: [0.5, 0],
                boxShadow: ['0 0 0 2px rgba(0,191,255,0.5)', '0 0 0 1px rgba(0,191,255,0)'],
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <CloudIcon size={180} glow />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 5+: Title with cinematic letter reveal */}
      <AnimatePresence>
        {phase >= 5 && (
          <motion.div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 1.5, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <CloudIcon size={120} glow className="mb-2" />
            </motion.div>
            <div className="flex gap-1 overflow-hidden">
              {TITLE.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-5xl md:text-7xl font-display font-bold tracking-wider"
                  style={{
                    color: 'var(--accent-blue)',
                    textShadow: '0 0 30px rgba(0,191,255,0.6), 0 0 60px rgba(0,191,255,0.3)',
                  }}
                  initial={{ y: 100, opacity: 0, rotateX: -90 }}
                  animate={{ y: 0, opacity: letter === ' ' ? 0 : 1, rotateX: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: i * 0.07,
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>

            {/* Phase 6: Subtitle + narration with cinematic reveal */}
            {phase >= 6 && (
              <>
                <motion.p
                  className="text-lg md:text-xl text-dim font-body tracking-widest"
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  Session 2: Cloud Infrastructure
                </motion.p>
                <Narration text={narrations.scene1} delay={0.5} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
