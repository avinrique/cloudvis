'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { narrations, iaasFeatures, stats } from '@/lib/content';
import Narration from '@/components/shared/Narration';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';
import GlowBox from '@/components/shared/GlowBox';

const ACCENT = '#3B82F6';

function FeatureIcon({ icon }: { icon: string }) {
  const paths: Record<string, JSX.Element> = {
    vm: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    network: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="19" r="3" />
        <circle cx="19" cy="19" r="3" />
        <line x1="12" y1="8" x2="5" y2="16" />
        <line x1="12" y1="8" x2="19" y2="16" />
      </svg>
    ),
    storage: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
    security: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <path d="M12 3l8 4v5c0 4.5-3.5 8.5-8 10-4.5-1.5-8-5.5-8-10V7l8-4z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  };
  return paths[icon] || null;
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof iaasFeatures)[number];
  index: number;
}) {
  return (
    <motion.div variants={fadeInUp}>
      <GlowBox color={ACCENT} intensity={0.2} className="h-full">
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `${ACCENT}15` }}
          >
            <FeatureIcon icon={feature.icon} />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-white mb-1">{feature.name}</h4>
            <p className="text-xs text-white/50 font-body leading-relaxed">{feature.description}</p>
            <p className="text-[10px] text-blue-300/60 font-body mt-1">{feature.example}</p>
          </div>
        </div>
      </GlowBox>
    </motion.div>
  );
}

function ServerDiagram() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <svg width="200" height="130" viewBox="0 0 200 130" fill="none">
        {/* Physical server */}
        <motion.rect
          x="50" y="80" width="100" height="40" rx="4"
          stroke={ACCENT} strokeWidth="1.5" fill={`${ACCENT}10`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.text x="100" y="104" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace"
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.5 }}>
          Physical Server
        </motion.text>
        {/* VM boxes on top */}
        {[0, 1, 2].map((i) => (
          <motion.g key={i}>
            <motion.rect
              x={55 + i * 32} y={20 + (i === 1 ? -5 : 0)} width="28" height="48"
              rx="3" stroke={ACCENT} strokeWidth="1" fill={`${ACCENT}20`}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 20 + (i === 1 ? -5 : 0), opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            />
            <motion.text
              x={69 + i * 32} y={48 + (i === 1 ? -5 : 0)}
              textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
              transition={{ delay: 1 + i * 0.2 }}
            >
              VM{i + 1}
            </motion.text>
          </motion.g>
        ))}
        {/* Arrow */}
        <motion.line
          x1="100" y1="70" x2="100" y2="80"
          stroke={ACCENT} strokeWidth="1" strokeDasharray="3 2"
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1.5 }}
        />
      </svg>
      <motion.span
        className="text-xs font-body text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {stats.vmPerServer} VMs per server
      </motion.span>
    </motion.div>
  );
}

export default function IaaSDeepDive() {
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
        IaaS Deep Dive
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Infrastructure as a Service — the building blocks
      </motion.p>

      {/* Phase 0: Server diagram */}
      {phase === 0 && <ServerDiagram />}

      {/* Phase 1: Feature grid */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="grid grid-cols-2 gap-4 w-full max-w-2xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {iaasFeatures.map((f, i) => (
              <FeatureCard key={f.name} feature={f} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Use case callout */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="mt-5 px-6 py-3 rounded-lg border border-blue-500/20"
            style={{ background: `${ACCENT}08` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-white/60 font-body text-center">
              <span className="text-blue-400 font-bold">Best for:</span> Custom infrastructure needs,
              legacy app migration, full OS-level control
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {phase < 2 && <InteractiveIndicator className="mt-6" />}
      <Narration text={narrations.scene3} delay={0.4} />
    </motion.div>
  );
}
