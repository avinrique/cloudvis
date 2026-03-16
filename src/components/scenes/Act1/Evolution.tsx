'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { useAnimationSpeed } from '@/components/hooks/useAnimationSpeed';
import { narrations, evolutionEras } from '@/lib/content';
import CloudIcon from '@/components/shared/CloudIcon';
import Narration from '@/components/shared/Narration';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';

// Era-specific icons
function MainframeIcon() {
  return (
    <svg width="48" height="56" viewBox="0 0 48 56" fill="none">
      <rect x="4" y="2" width="40" height="52" rx="3" stroke="var(--accent-amber)" strokeWidth="1.5" fill="rgba(17,22,51,0.6)" />
      <rect x="10" y="8" width="28" height="8" rx="1" stroke="var(--accent-amber)" strokeWidth="1" fill="rgba(245,158,11,0.1)" />
      <rect x="10" y="20" width="28" height="8" rx="1" stroke="var(--accent-amber)" strokeWidth="1" fill="rgba(245,158,11,0.1)" />
      <rect x="10" y="32" width="28" height="8" rx="1" stroke="var(--accent-amber)" strokeWidth="1" fill="rgba(245,158,11,0.1)" />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx="16"
          cy={12 + i * 12}
          r="2"
          fill="var(--accent-amber)"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      <rect x="10" y="44" width="6" height="6" rx="3" stroke="var(--accent-amber)" strokeWidth="1" />
      <rect x="20" y="44" width="6" height="6" rx="3" stroke="var(--accent-amber)" strokeWidth="1" />
    </svg>
  );
}

function PCIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="4" width="32" height="24" rx="2" stroke="var(--accent-green)" strokeWidth="1.5" fill="rgba(17,22,51,0.6)" />
      <rect x="12" y="8" width="24" height="16" rx="1" fill="rgba(34,197,94,0.08)" />
      <motion.text
        x="16" y="20"
        fill="var(--accent-green)"
        fontSize="8"
        fontFamily="monospace"
        animate={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      >
        C:\&gt;_
      </motion.text>
      <path d="M20 28h8v4H20z" stroke="var(--accent-green)" strokeWidth="1" />
      <rect x="14" y="34" width="20" height="8" rx="1" stroke="var(--accent-green)" strokeWidth="1.5" fill="rgba(17,22,51,0.6)" />
      <line x1="18" y1="37" x2="30" y2="37" stroke="var(--accent-green)" strokeWidth="0.5" opacity="0.4" />
      <line x1="18" y1="39" x2="30" y2="39" stroke="var(--accent-green)" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

function ServerRackIcon() {
  return (
    <svg width="48" height="52" viewBox="0 0 48 52" fill="none">
      <rect x="6" y="2" width="36" height="48" rx="3" stroke="var(--accent-purple)" strokeWidth="1.5" fill="rgba(17,22,51,0.6)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="10" y={6 + i * 11} width="28" height="8" rx="1" stroke="var(--accent-purple)" strokeWidth="0.8" fill="rgba(147,51,234,0.08)" />
          <motion.circle
            cx="14"
            cy={10 + i * 11}
            r="1.5"
            fill="var(--accent-green)"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
          <line x1="20" y1={9 + i * 11} x2="34" y2={9 + i * 11} stroke="var(--accent-purple)" strokeWidth="0.5" opacity="0.3" />
          <line x1="20" y1={11 + i * 11} x2="32" y2={11 + i * 11} stroke="var(--accent-purple)" strokeWidth="0.5" opacity="0.3" />
        </g>
      ))}
    </svg>
  );
}

const eraIcons: Record<string, React.FC> = {
  mainframe: MainframeIcon,
  pc: PCIcon,
  server: ServerRackIcon,
  cloud: () => <CloudIcon size={56} color="var(--accent-blue)" glow />,
};

const eraColors = ['var(--accent-amber)', 'var(--accent-green)', 'var(--accent-purple)', 'var(--accent-blue)'];

const TIMELINE_WIDTH = 800;
const NODE_SPACING = TIMELINE_WIDTH / (evolutionEras.length - 1);

export default function Evolution() {
  const { phase } = useSceneProgress({ totalPhases: 5 });
  const { speed } = useAnimationSpeed();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-8">
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-display text-white/90 mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        The Evolution of Computing
      </motion.h2>

      {/* Timeline container */}
      <div className="relative" style={{ width: TIMELINE_WIDTH, height: 240 }}>
        {/* Timeline base line */}
        <motion.div
          className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2"
          style={{ background: 'linear-gradient(90deg, var(--accent-amber), var(--accent-blue))' }}
          initial={{ width: 0 }}
          animate={{ width: phase >= 1 ? TIMELINE_WIDTH : 0 }}
          transition={{ duration: 1.5 / speed, ease: 'easeOut' }}
        />

        {/* Faded guideline */}
        {phase === 0 && (
          <motion.div
            className="absolute top-1/2 left-0 h-[1px] w-full -translate-y-1/2 bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Era nodes */}
        {evolutionEras.map((era, i) => {
          const isVisible = phase >= i + 1;
          const x = i * NODE_SPACING;
          const EraIcon = eraIcons[era.icon];
          const color = eraColors[i];

          // Calculate progressive line width up to this node
          const lineProgress = phase >= i + 1 ? x : 0;

          return (
            <AnimatePresence key={era.era}>
              {isVisible && (
                <motion.div
                  className="absolute flex flex-col items-center"
                  style={{
                    left: x,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 160,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: 0.1,
                  }}
                >
                  {/* Node dot on timeline */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2"
                    style={{
                      borderColor: color,
                      background: 'var(--bg-void)',
                      boxShadow: `0 0 12px ${color}`,
                      zIndex: 10,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, delay: 0.2 }}
                  />

                  {/* Icon above */}
                  <motion.div
                    className="mb-8"
                    style={{ marginTop: -80 }}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <EraIcon />
                  </motion.div>

                  {/* Period label */}
                  <motion.span
                    className="text-lg font-display font-bold mt-10"
                    style={{ color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {era.period}
                  </motion.span>

                  {/* Era name */}
                  <motion.span
                    className="text-sm font-display text-white/80 mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {era.era}
                  </motion.span>

                  {/* Description */}
                  <motion.p
                    className="text-xs text-dim font-body text-center mt-2 leading-relaxed"
                    style={{ maxWidth: 140 }}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {era.description}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* CapEx -> OpEx label at phase 4 */}
      <AnimatePresence>
        {phase >= 4 && (
          <motion.div
            className="mt-12 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="text-red-400 font-display text-xl line-through opacity-60">CapEx</span>
            <motion.svg
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="none"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <path d="M2 10h30M28 5l6 5-6 5" stroke="var(--accent-gold)" strokeWidth="2" />
            </motion.svg>
            <motion.span
              className="font-display text-xl"
              style={{ color: 'var(--accent-green)', textShadow: '0 0 15px rgba(34,197,94,0.5)' }}
              animate={{ textShadow: ['0 0 15px rgba(34,197,94,0.5)', '0 0 30px rgba(34,197,94,0.8)', '0 0 15px rgba(34,197,94,0.5)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              OpEx
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive indicator at phase 0 */}
      {phase === 0 && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <InteractiveIndicator />
        </motion.div>
      )}

      {/* Narration at final phase */}
      {phase >= 4 && (
        <Narration text={narrations.scene3} delay={1} />
      )}
    </div>
  );
}
