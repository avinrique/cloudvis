'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, staggerContainer, cinematicReveal } from '@/lib/animations';
import { narrations, iaasFeatures, stats } from '@/lib/content';
import Narration from '@/components/shared/Narration';
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

function AnimatedServerDiagram() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg width="260" height="150" viewBox="0 0 260 150" fill="none">
        {/* Physical server - draws in */}
        <motion.rect
          x="50" y="90" width="160" height="45" rx="6"
          stroke={ACCENT} strokeWidth="1.5" fill={`${ACCENT}08`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.text x="130" y="118" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace"
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.8, duration: 0.5 }}>
          Physical Server
        </motion.text>

        {/* Hypervisor line */}
        <motion.line
          x1="60" y1="85" x2="200" y2="85"
          stroke={ACCENT} strokeWidth="0.5" strokeDasharray="4 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
        <motion.text x="130" y="82" textAnchor="middle" fill={ACCENT} fontSize="8" fontFamily="monospace"
          initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 0.8 }}>
          Hypervisor
        </motion.text>

        {/* VMs spring up */}
        {[0, 1, 2].map((i) => (
          <motion.g key={i}>
            <motion.rect
              x={60 + i * 55} y="12" width="45" height="65" rx="5"
              stroke={ACCENT} strokeWidth="1" fill={`${ACCENT}12`}
              initial={{ y: 90, opacity: 0, scaleY: 0 }}
              animate={{ y: 12, opacity: 1, scaleY: 1 }}
              transition={{
                delay: 1 + i * 0.2,
                type: 'spring',
                stiffness: 150,
                damping: 14,
              }}
            />
            {/* OS + App blocks inside VM */}
            <motion.rect
              x={64 + i * 55} y="50" width="37" height="12" rx="2"
              fill={`${ACCENT}20`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.4 + i * 0.15 }}
            />
            <motion.text
              x={82 + i * 55} y="59" textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.5 + i * 0.15 }}
            >OS</motion.text>
            <motion.rect
              x={64 + i * 55} y="22" width="37" height="22" rx="3"
              fill={`${ACCENT}25`}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + i * 0.15, type: 'spring', stiffness: 200 }}
            />
            <motion.text
              x={82 + i * 55} y="37" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold"
              initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.7 + i * 0.15 }}
            >App {i + 1}</motion.text>
          </motion.g>
        ))}

        {/* Animated pulse on VMs */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`led-${i}`}
            cx={67 + i * 55} cy={17}
            r="2" fill="#22C55E"
            animate={{ opacity: [1, 0.3, 1], r: [2, 2.5, 2] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </svg>
      <motion.div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{ background: `${ACCENT}10`, border: `1px solid ${ACCENT}20` }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <span className="text-xs font-code" style={{ color: ACCENT }}>{stats.vmPerServer}</span>
        <span className="text-[10px] text-white/40 font-body">VMs per server</span>
      </motion.div>
    </motion.div>
  );
}

export default function IaaSDeepDive() {
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
        IaaS Deep Dive
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Infrastructure as a Service — the building blocks
      </motion.p>

      {phase === 0 && <AnimatedServerDiagram />}

      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="grid grid-cols-2 gap-4 w-full max-w-2xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {iaasFeatures.map((f, i) => (
              <motion.div key={f.name} variants={fadeInUp}>
                <GlowBox color={ACCENT} intensity={0.2} pulse className="h-full">
                  <div className="flex items-start gap-3">
                    <motion.div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${ACCENT}15` }}
                      animate={{ rotate: [0, 2, -2, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                    >
                      <FeatureIcon icon={f.icon} />
                    </motion.div>
                    <div>
                      <h4 className="text-sm font-display font-bold text-white mb-1">{f.name}</h4>
                      <p className="text-xs text-white/50 font-body leading-relaxed">{f.description}</p>
                      <p className="text-[10px] text-blue-300/50 font-body mt-1">{f.example}</p>
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
            className="mt-5 px-6 py-3 rounded-lg border border-blue-500/20 relative overflow-hidden"
            style={{ background: `${ACCENT}06` }}
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}08, transparent)` }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-sm text-white/60 font-body text-center relative z-10">
              <span className="text-blue-400 font-bold">Best for:</span> Custom infrastructure needs,
              legacy app migration, full OS-level control
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Narration text={narrations.scene3} delay={0.4} />
    </motion.div>
  );
}
