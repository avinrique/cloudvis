'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, cinematicReveal } from '@/lib/animations';
import { narrations, autoScalingSteps, stats } from '@/lib/content';
import Narration from '@/components/shared/Narration';

const ACCENT = '#22C55E';

function ServerCluster({ count, color }: { count: number; color: string }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center"
          initial={{ scale: 0, opacity: 0, rotateY: -90 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 250, damping: 18 }}
        >
          <motion.svg width="36" height="40" viewBox="0 0 36 40" fill="none"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}>
            <rect x="2" y="2" width="32" height="14" rx="2" stroke={color} strokeWidth="1.2" fill={`${color}15`} />
            <circle cx="8" cy="9" r="1.5" fill={color}>
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
            </circle>
            <rect x="2" y="20" width="32" height="14" rx="2" stroke={color} strokeWidth="1.2" fill={`${color}15`} />
            <circle cx="8" cy="27" r="1.5" fill={color}>
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.2 + 0.3}s`} />
            </circle>
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
}

function UserIcons({ count }: { count: number }) {
  const display = Math.min(count / 50, 10);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: Math.round(display) }).map((_, i) => (
        <motion.svg key={i} width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="white" strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ delay: i * 0.03, type: 'spring', stiffness: 300, damping: 15 }}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
        </motion.svg>
      ))}
      <motion.span className="text-xs text-white/40 font-code ml-1"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {count}
      </motion.span>
    </div>
  );
}

function LoadBalancerDiagram() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 mt-4"
      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg width="280" height="100" viewBox="0 0 280 100" fill="none">
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <circle cx={100 + i * 30} cy="15" r="6" stroke="white" strokeWidth="1" opacity="0.4" />
              <circle cx={100 + i * 30} cy="12" r="3" stroke="white" strokeWidth="0.8" opacity="0.3" />
            </g>
          ))}
          <text x="140" y="32" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" opacity="0.4">Users</text>
        </motion.g>
        <motion.rect x="100" y="40" width="80" height="20" rx="4"
          stroke={ACCENT} strokeWidth="1.5" fill={`${ACCENT}15`}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4, duration: 0.5 }} />
        <motion.text x="140" y="54" textAnchor="middle" fill={ACCENT} fontSize="8" fontFamily="monospace"
          initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.7 }}>Load Balancer</motion.text>
        {[0, 1, 2].map((i) => (
          <motion.line key={`line-${i}`} x1="140" y1="60" x2={80 + i * 60} y2="80"
            stroke={ACCENT} strokeWidth="1" strokeDasharray="3 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }} />
        ))}
        {[0, 1, 2].map((i) => (
          <motion.rect key={`srv-${i}`} x={65 + i * 60} y="78" width="30" height="16" rx="3"
            stroke={ACCENT} strokeWidth="1" fill={`${ACCENT}20`}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.1, type: 'spring', stiffness: 300 }} />
        ))}
        {/* Traffic animation dots */}
        {[0, 1, 2].map((i) => (
          <motion.circle key={`dot-${i}`} r="2" fill={ACCENT}
            initial={{ cx: 140, cy: 60, opacity: 0 }}
            animate={{
              cx: [140, 80 + i * 60],
              cy: [60, 80],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.4 + 1.5, repeatDelay: 0.5 }}
          />
        ))}
      </svg>
      <span className="text-xs text-white/40 font-body">Traffic distributed evenly across servers</span>
    </motion.div>
  );
}

export default function AutoScaling() {
  const { phase } = useSceneProgress({ totalPhases: 6, autoAdvance: [2500, 2000, 2000, 2000, 2000, 3500] });

  const currentStep = phase < 5 ? autoScalingSteps[Math.min(phase, autoScalingSteps.length - 1)] : null;

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
        Auto-Scaling & Load Balancing
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Elastic infrastructure that responds to demand
      </motion.p>

      {currentStep && (
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            className="flex flex-col items-center gap-4 w-full max-w-lg"
            initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="px-4 py-2 rounded-full text-sm font-display font-bold relative overflow-hidden"
              style={{ color: currentStep.color, border: `1.5px solid ${currentStep.color}40`, background: `${currentStep.color}10` }}
            >
              <motion.div className="absolute inset-0"
                style={{ background: `linear-gradient(90deg, transparent, ${currentStep.color}15, transparent)` }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
              <span className="relative z-10">{currentStep.label}</span>
            </motion.div>
            <ServerCluster count={currentStep.servers} color={currentStep.color} />
            <UserIcons count={currentStep.users} />
            <div className="flex gap-1.5 mt-2">
              {autoScalingSteps.map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: i === phase ? currentStep.color : 'rgba(255,255,255,0.1)',
                    boxShadow: i === phase ? `0 0 8px ${currentStep.color}60` : 'none',
                  }}
                  animate={i === phase ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      <AnimatePresence>
        {phase >= 5 && <LoadBalancerDiagram />}
      </AnimatePresence>

      <Narration text={narrations.scene9} delay={0.4} />
    </motion.div>
  );
}
