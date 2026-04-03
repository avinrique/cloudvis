'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { narrations, storageTypes } from '@/lib/content';
import Narration from '@/components/shared/Narration';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';
import GlowBox from '@/components/shared/GlowBox';

const COLOR_MAP: Record<string, string> = {
  blue: '#3B82F6',
  purple: '#A855F7',
  green: '#22C55E',
};

function StorageIcon({ type, color }: { type: string; color: string }) {
  if (type === 'Object Storage') {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  }
  if (type === 'Block Storage') {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="5" rx="1" />
        <rect x="2" y="11" width="20" height="5" rx="1" />
        <rect x="2" y="18" width="20" height="5" rx="1" />
      </svg>
    );
  }
  // File Storage
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  );
}

function StorageCard({
  storage,
  index,
}: {
  storage: (typeof storageTypes)[number];
  index: number;
}) {
  const color = COLOR_MAP[storage.color] || '#3B82F6';

  return (
    <motion.div variants={fadeInUp}>
      <GlowBox color={color} intensity={0.2} className="h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: `${color}15` }}
            >
              <StorageIcon type={storage.name} color={color} />
            </div>
            <div>
              <h4 className="text-sm font-display font-bold" style={{ color }}>{storage.name}</h4>
              <p className="text-xs text-white/50 font-body">{storage.description}</p>
            </div>
          </div>

          <div className="flex gap-3 text-[10px]">
            <div className="flex-1 p-2 rounded-md bg-white/5">
              <span className="text-white/30 font-body block mb-0.5">Use Cases</span>
              <span className="text-white/60 font-body">{storage.useCases}</span>
            </div>
          </div>

          <div className="px-2 py-1.5 rounded-md border border-white/5 bg-white/[0.02]">
            <span className="text-[10px] text-amber-300 font-body italic">
              &ldquo;{storage.analogy}&rdquo;
            </span>
          </div>

          <span className="text-[10px] font-body" style={{ color: `${color}80` }}>
            {storage.examples}
          </span>
        </div>
      </GlowBox>
    </motion.div>
  );
}

export default function CloudStorage() {
  const { phase } = useSceneProgress({ totalPhases: 4 });

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center px-6 py-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-display font-bold text-white mb-1"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        Cloud Storage Types
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Three flavors of cloud storage
      </motion.p>

      {/* Cards revealed one per phase */}
      <motion.div
        className="grid grid-cols-3 gap-4 w-full max-w-4xl"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {storageTypes.map((storage, i) => (
          <AnimatePresence key={storage.name}>
            {phase >= i + 1 ? (
              <StorageCard storage={storage} index={i} />
            ) : (
              <motion.div
                className="rounded-lg border border-white/5 border-dashed p-6"
                style={{ background: 'rgba(17,22,51,0.3)', minHeight: '200px' }}
              >
                <div className="flex items-center justify-center h-full">
                  <span className="text-white/10 text-sm font-body">{storage.name}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </motion.div>

      {phase < 3 && <InteractiveIndicator className="mt-6" />}
      <Narration text={narrations.scene8} delay={0.4} />
    </motion.div>
  );
}
