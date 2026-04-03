'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, staggerContainer, cinematicReveal } from '@/lib/animations';
import { narrations, paasFeatures, stats } from '@/lib/content';
import Narration from '@/components/shared/Narration';
import GlowBox from '@/components/shared/GlowBox';

const ACCENT = '#A855F7';

function FeatureIcon({ icon }: { icon: string }) {
  const paths: Record<string, JSX.Element> = {
    deploy: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <path d="M12 3v12" /><polyline points="8 11 12 15 16 11" /><path d="M20 21H4" />
      </svg>
    ),
    database: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
    scale: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    tools: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  };
  return paths[icon] || null;
}

function PipelineDiagram() {
  const steps = [
    { label: 'git push', icon: '↗' },
    { label: 'Build', icon: '⚙' },
    { label: 'Test', icon: '✓' },
    { label: 'Deploy', icon: '▶' },
    { label: 'Live!', icon: '●' },
  ];

  return (
    <motion.div
      className="flex items-center gap-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {steps.map((step, i) => (
        <motion.div key={step.label} className="flex items-center gap-1">
          <motion.div
            className="flex flex-col items-center gap-1 px-4 py-3 rounded-lg relative overflow-hidden"
            style={{
              background: i === steps.length - 1 ? `${ACCENT}20` : `rgba(17,22,51,0.6)`,
              border: `1px solid ${i === steps.length - 1 ? `${ACCENT}50` : 'rgba(255,255,255,0.08)'}`,
            }}
            initial={{ scale: 0, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{
              delay: 0.3 + i * 0.25,
              type: 'spring',
              stiffness: 200,
              damping: 18,
            }}
          >
            {/* Sweep glow on active */}
            {i === steps.length - 1 && (
              <motion.div
                className="absolute inset-0"
                style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}15, transparent)` }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            )}
            <span className="text-lg" style={{ color: i === steps.length - 1 ? ACCENT : 'rgba(255,255,255,0.4)' }}>
              {step.icon}
            </span>
            <span className="text-[10px] font-code relative z-10" style={{ color: i === steps.length - 1 ? ACCENT : 'rgba(255,255,255,0.5)' }}>
              {step.label}
            </span>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div
              className="flex items-center"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.25, duration: 0.3 }}
            >
              <motion.div
                className="w-6 h-px"
                style={{ background: `linear-gradient(90deg, ${ACCENT}30, ${ACCENT}60)` }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
              <motion.span className="text-white/20 text-xs -ml-1">›</motion.span>
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function PaaSDeepDive() {
  const { phase } = useSceneProgress({ totalPhases: 3, autoAdvance: [3500, 3000, 4000] });

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center px-6 py-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-display font-bold mb-1"
        style={{ color: ACCENT }}
        variants={cinematicReveal}
        initial="hidden"
        animate="visible"
      >
        PaaS Deep Dive
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Platform as a Service — just bring your code
      </motion.p>

      {phase === 0 && <PipelineDiagram />}

      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="grid grid-cols-2 gap-4 w-full max-w-2xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {paasFeatures.map((f, i) => (
              <motion.div key={f.name} variants={fadeInUp}>
                <GlowBox color={ACCENT} intensity={0.15} pulse className="h-full">
                  <div className="flex items-start gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${ACCENT}15` }}
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                    >
                      <FeatureIcon icon={f.icon} />
                    </motion.div>
                    <div>
                      <h4 className="text-sm font-display font-bold text-white mb-1">{f.name}</h4>
                      <p className="text-xs text-white/50 font-body leading-relaxed">{f.description}</p>
                      <p className="text-[10px] text-purple-300/50 font-body mt-1">{f.example}</p>
                    </div>
                  </div>
                </GlowBox>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="mt-5 flex items-center gap-4"
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="px-5 py-3 rounded-lg border border-purple-500/20 relative overflow-hidden"
              style={{ background: `${ACCENT}08` }}
            >
              <motion.span
                className="text-2xl font-display font-bold"
                style={{ color: ACCENT }}
                animate={{ textShadow: [`0 0 10px ${ACCENT}40`, `0 0 20px ${ACCENT}60`, `0 0 10px ${ACCENT}40`] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stats.deployTime}
              </motion.span>
              <span className="text-xs text-white/40 font-body ml-2">to deploy</span>
            </motion.div>
            <div className="px-5 py-3 rounded-lg border border-purple-500/20" style={{ background: `${ACCENT}08` }}>
              <p className="text-sm text-white/60 font-body">
                <span className="text-purple-400 font-bold">Best for:</span> App dev, rapid prototyping, startups
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Narration text={narrations.scene4} delay={0.4} />
    </motion.div>
  );
}
