'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { narrations, paasFeatures, stats } from '@/lib/content';
import Narration from '@/components/shared/Narration';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';
import GlowBox from '@/components/shared/GlowBox';

const ACCENT = '#A855F7';

function FeatureIcon({ icon }: { icon: string }) {
  const paths: Record<string, JSX.Element> = {
    deploy: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <path d="M12 3v12" />
        <polyline points="8 11 12 15 16 11" />
        <path d="M20 21H4" />
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
  const steps = ['git push', 'Build', 'Test', 'Deploy', 'Live'];
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {steps.map((step, i) => (
        <motion.div key={step} className="flex items-center gap-2">
          <motion.div
            className="px-3 py-2 rounded-md text-xs font-code"
            style={{
              background: `${ACCENT}${i === steps.length - 1 ? '30' : '15'}`,
              border: `1px solid ${ACCENT}${i === steps.length - 1 ? '60' : '30'}`,
              color: i === steps.length - 1 ? ACCENT : 'rgba(255,255,255,0.7)',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          >
            {step}
          </motion.div>
          {i < steps.length - 1 && (
            <motion.span
              className="text-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.2 }}
            >
              →
            </motion.span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function PaaSDeepDive() {
  const { phase } = useSceneProgress({ totalPhases: 3 });

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
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        PaaS Deep Dive
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Platform as a Service — just bring your code
      </motion.p>

      {/* Phase 0: Pipeline diagram */}
      {phase === 0 && <PipelineDiagram />}

      {/* Phase 1: Feature grid */}
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
                <GlowBox color={ACCENT} intensity={0.2} className="h-full">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${ACCENT}15` }}
                    >
                      <FeatureIcon icon={f.icon} />
                    </div>
                    <div>
                      <h4 className="text-sm font-display font-bold text-white mb-1">{f.name}</h4>
                      <p className="text-xs text-white/50 font-body leading-relaxed">{f.description}</p>
                      <p className="text-[10px] text-purple-300/60 font-body mt-1">{f.example}</p>
                    </div>
                  </div>
                </GlowBox>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Deploy time callout */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="mt-5 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-5 py-3 rounded-lg border border-purple-500/20" style={{ background: `${ACCENT}08` }}>
              <span className="text-2xl font-display font-bold" style={{ color: ACCENT }}>
                {stats.deployTime}
              </span>
              <span className="text-xs text-white/40 font-body ml-2">to deploy</span>
            </div>
            <div className="px-5 py-3 rounded-lg border border-purple-500/20" style={{ background: `${ACCENT}08` }}>
              <p className="text-sm text-white/60 font-body">
                <span className="text-purple-400 font-bold">Best for:</span> App development, rapid prototyping, startups
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {phase < 2 && <InteractiveIndicator className="mt-6" />}
      <Narration text={narrations.scene4} delay={0.4} />
    </motion.div>
  );
}
