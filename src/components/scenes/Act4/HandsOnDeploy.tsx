'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationSpeed } from '@/components/hooks/useAnimationSpeed';
import { useTypewriter } from '@/components/hooks/useTypewriter';
import { narrations } from '@/lib/content';
import { fadeInUp, scaleIn } from '@/lib/animations';
import GlowBox from '@/components/shared/GlowBox';
import Terminal from '@/components/shared/Terminal';
import ParticleField from '@/components/shared/ParticleField';
import Narration from '@/components/shared/Narration';

const CODE_SNIPPET = `// app/page.js
export default function Home() {
  return (
    <main>
      <h1>Hello Cloud!</h1>
      <p>Deployed in seconds.</p>
    </main>
  );
}`;

const PIPELINE_STEPS = [
  { label: 'Code', icon: '{ }' },
  { label: 'Git', icon: '>' },
  { label: 'Build', icon: '#' },
  { label: 'Deploy', icon: '^' },
  { label: 'Live', icon: '*' },
];

const DEPLOY_URL = 'https://myapp.vercel.app';

export default function HandsOnDeploy() {
  const [phase, setPhase] = useState(0);
  const [activePipelineStep, setActivePipelineStep] = useState(-1);
  const { scaledTimeout } = useAnimationSpeed();

  // Typewriter for terminal command
  const { displayText: terminalText, isComplete: terminalDone } = useTypewriter({
    text: '$ git push origin main',
    speed: 60,
    delay: 400,
    enabled: phase >= 1,
  });

  // Auto-advance phases
  useEffect(() => {
    return scaledTimeout(() => setPhase(1), 2200);
  }, [scaledTimeout]);

  useEffect(() => {
    if (phase === 1 && terminalDone) {
      return scaledTimeout(() => setPhase(2), 1000);
    }
  }, [phase, terminalDone, scaledTimeout]);

  // Pipeline step-by-step illumination
  useEffect(() => {
    if (phase === 2) {
      const cleanups: (() => void)[] = [];
      PIPELINE_STEPS.forEach((_, i) => {
        const cleanup = scaledTimeout(() => {
          setActivePipelineStep(i);
          if (i === PIPELINE_STEPS.length - 1) {
            scaledTimeout(() => setPhase(3), 800);
          }
        }, i * 600);
        cleanups.push(cleanup);
      });
      return () => cleanups.forEach((c) => c());
    }
  }, [phase, scaledTimeout]);

  useEffect(() => {
    if (phase === 3) {
      return scaledTimeout(() => setPhase(4), 2000);
    }
  }, [phase, scaledTimeout]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-6 gap-5">
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-display font-bold tracking-wide"
        style={{
          color: 'var(--accent-cyan)',
          textShadow: '0 0 25px rgba(34,211,238,0.4)',
        }}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        From Code to Cloud
      </motion.h2>

      {/* Phase 0: Code editor */}
      <AnimatePresence>
        {phase >= 0 && phase < 2 && (
          <motion.div
            className="w-full max-w-xl"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
          >
            <GlowBox color="var(--accent-cyan)" pulse={false}>
              <div className="p-1">
                {/* Editor title bar */}
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="ml-2 text-xs text-dim font-mono">app/page.js</span>
                </div>
                <pre className="text-xs md:text-sm font-mono text-green-300/80 leading-relaxed whitespace-pre overflow-x-auto">
                  {CODE_SNIPPET}
                </pre>
              </div>
            </GlowBox>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 1: Terminal */}
      <AnimatePresence>
        {phase >= 1 && phase < 2 && (
          <motion.div
            className="w-full max-w-xl"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
          >
            <Terminal title="Terminal" showCursor={!terminalDone}>
              <span className="text-green-400 font-mono text-sm">
                {terminalText}
              </span>
              {terminalDone && (
                <motion.div
                  className="mt-2 text-xs text-dim font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-cyan-400">Enumerating objects: 42, done.</p>
                  <p className="text-cyan-400">Compressing objects: 100% (38/38), done.</p>
                  <p className="text-green-400 mt-1">To github.com:user/myapp.git</p>
                  <p className="text-green-400">   abc1234..def5678  main -&gt; main</p>
                </motion.div>
              )}
            </Terminal>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Pipeline chain */}
      <AnimatePresence>
        {phase >= 2 && phase < 4 && (
          <motion.div
            className="flex items-center gap-1 md:gap-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            {PIPELINE_STEPS.map((step, i) => {
              const isActive = i <= activePipelineStep;
              return (
                <div key={step.label} className="flex items-center">
                  <motion.div
                    className="flex flex-col items-center gap-1"
                    initial={{ opacity: 0.3, scale: 0.9 }}
                    animate={{
                      opacity: isActive ? 1 : 0.3,
                      scale: isActive ? 1 : 0.9,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-lg font-mono"
                      style={{
                        background: isActive
                          ? 'rgba(34,211,238,0.15)'
                          : 'rgba(255,255,255,0.03)',
                        border: `1.5px solid ${isActive ? 'rgba(34,211,238,0.6)' : 'rgba(255,255,255,0.1)'}`,
                        color: isActive ? 'var(--accent-cyan)' : 'var(--text-dim)',
                        boxShadow: isActive ? '0 0 15px rgba(34,211,238,0.25)' : 'none',
                      }}
                    >
                      {step.icon}
                    </motion.div>
                    <span
                      className="text-xs font-body"
                      style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-dim)' }}
                    >
                      {step.label}
                    </span>
                  </motion.div>

                  {/* Arrow between steps */}
                  {i < PIPELINE_STEPS.length - 1 && (
                    <motion.span
                      className="mx-1 text-lg"
                      style={{
                        color: i < activePipelineStep
                          ? 'var(--accent-cyan)'
                          : 'rgba(255,255,255,0.15)',
                      }}
                    >
                      &rarr;
                    </motion.span>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3: Browser mockup */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            className="w-full max-w-md"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: '1px solid rgba(34,211,238,0.3)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <div
                  className="flex-1 mx-2 px-3 py-1 rounded-md text-xs font-mono text-center"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--accent-cyan)',
                  }}
                >
                  {DEPLOY_URL}
                </div>
              </div>
              {/* Page content */}
              <div className="p-8 text-center">
                <motion.h3
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Hello Cloud!
                </motion.h3>
                <motion.p
                  className="text-sm text-dim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Deployed in seconds.
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 4: Confetti */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ParticleField count={60} color="var(--accent-cyan)" spread={400} mode="confetti" />
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
            <Narration text={narrations.scene11} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
