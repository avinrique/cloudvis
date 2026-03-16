'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { scaleIn, fadeInUp } from '@/lib/animations';
import { narrations, deploymentModels } from '@/lib/content';
import GlowBox from '@/components/shared/GlowBox';
import Narration from '@/components/shared/Narration';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';

const colorMap: Record<string, string> = {
  blue: '#3B82F6',
  purple: '#A855F7',
  amber: '#F59E0B',
  cyan: '#06B6D4',
};

/* ── SVG Icons per quadrant ──────────────────────────────── */

function PublicIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Globe */}
      <circle cx="28" cy="32" r="18" stroke="#3B82F6" strokeWidth="1.5" opacity={0.9} />
      <ellipse cx="28" cy="32" rx="8" ry="18" stroke="#3B82F6" strokeWidth="1" opacity={0.6} />
      <line x1="10" y1="24" x2="46" y2="24" stroke="#3B82F6" strokeWidth="1" opacity={0.5} />
      <line x1="10" y1="40" x2="46" y2="40" stroke="#3B82F6" strokeWidth="1" opacity={0.5} />
      <line x1="28" y1="14" x2="28" y2="50" stroke="#3B82F6" strokeWidth="1" opacity={0.5} />
      {/* Bus shape */}
      <rect x="44" y="36" width="16" height="10" rx="2" stroke="#3B82F6" strokeWidth="1.5" fill="#3B82F620" />
      <rect x="45" y="38" width="4" height="4" rx="0.5" fill="#3B82F650" />
      <rect x="51" y="38" width="4" height="4" rx="0.5" fill="#3B82F650" />
      <circle cx="48" cy="48" r="2" fill="#3B82F6" />
      <circle cx="56" cy="48" r="2" fill="#3B82F6" />
    </svg>
  );
}

function PrivateIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Padlock */}
      <rect x="16" y="28" width="20" height="16" rx="2" stroke="#A855F7" strokeWidth="1.5" fill="#A855F720" />
      <path d="M21 28V22a5 5 0 0 1 10 0v6" stroke="#A855F7" strokeWidth="1.5" />
      <circle cx="26" cy="36" r="2" fill="#A855F7" />
      <line x1="26" y1="38" x2="26" y2="41" stroke="#A855F7" strokeWidth="1.5" />
      {/* Car shape */}
      <path d="M44 38 L48 30 L58 30 L62 38Z" stroke="#A855F7" strokeWidth="1.5" fill="#A855F720" />
      <rect x="42" y="38" width="22" height="8" rx="2" stroke="#A855F7" strokeWidth="1.5" fill="#A855F710" />
      <circle cx="48" cy="48" r="2" fill="#A855F7" />
      <circle cx="58" cy="48" r="2" fill="#A855F7" />
    </svg>
  );
}

function HybridIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Building */}
      <rect x="4" y="22" width="14" height="22" rx="1" stroke="#F59E0B" strokeWidth="1.5" fill="#F59E0B15" />
      <rect x="7" y="25" width="3" height="3" fill="#F59E0B50" />
      <rect x="12" y="25" width="3" height="3" fill="#F59E0B50" />
      <rect x="7" y="31" width="3" height="3" fill="#F59E0B50" />
      <rect x="12" y="31" width="3" height="3" fill="#F59E0B50" />
      {/* Bridge */}
      <line x1="18" y1="36" x2="38" y2="36" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M20 36 Q24 28 28 36 Q32 28 36 36" stroke="#F59E0B" strokeWidth="1" opacity={0.6} />
      {/* Cloud */}
      <path d="M42 32 a6 6 0 0 1 11-2 a5 5 0 0 1 7 5 a4 4 0 0 1-2 8H42a4 4 0 0 1 0-8z" stroke="#F59E0B" strokeWidth="1.5" fill="#F59E0B15" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      {/* Dashed fence */}
      <rect x="6" y="16" width="52" height="36" rx="4" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4 3" opacity={0.6} />
      {/* Building cluster */}
      <rect x="12" y="26" width="10" height="16" rx="1" stroke="#06B6D4" strokeWidth="1.2" fill="#06B6D415" />
      <rect x="14" y="29" width="2.5" height="2.5" fill="#06B6D450" />
      <rect x="18" y="29" width="2.5" height="2.5" fill="#06B6D450" />
      <rect x="14" y="34" width="2.5" height="2.5" fill="#06B6D450" />
      <rect x="18" y="34" width="2.5" height="2.5" fill="#06B6D450" />
      <rect x="27" y="22" width="10" height="20" rx="1" stroke="#06B6D4" strokeWidth="1.2" fill="#06B6D415" />
      <rect x="29" y="25" width="2.5" height="2.5" fill="#06B6D450" />
      <rect x="33" y="25" width="2.5" height="2.5" fill="#06B6D450" />
      <rect x="29" y="30" width="2.5" height="2.5" fill="#06B6D450" />
      <rect x="33" y="30" width="2.5" height="2.5" fill="#06B6D450" />
      <rect x="29" y="35" width="2.5" height="2.5" fill="#06B6D450" />
      <rect x="42" y="28" width="10" height="14" rx="1" stroke="#06B6D4" strokeWidth="1.2" fill="#06B6D415" />
      <rect x="44" y="31" width="2.5" height="2.5" fill="#06B6D450" />
      <rect x="48" y="31" width="2.5" height="2.5" fill="#06B6D450" />
      <rect x="44" y="36" width="2.5" height="2.5" fill="#06B6D450" />
    </svg>
  );
}

const icons = [PublicIcon, PrivateIcon, HybridIcon, CommunityIcon];

/* ── Quadrant card ───────────────────────────────────────── */

function Quadrant({ index, model }: { index: number; model: typeof deploymentModels[number] }) {
  const hex = colorMap[model.color] ?? '#fff';
  const Icon = icons[index];

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="h-full"
    >
      <GlowBox
        color={hex}
        pulse={index === 2}
        className="h-full flex flex-col items-center justify-center gap-3 text-center relative"
      >
        <Icon />
        <h3
          className="text-lg font-heading font-bold"
          style={{ color: hex }}
        >
          {model.name}
        </h3>
        <span className="text-xs text-white/50 font-body tracking-wider uppercase">
          {model.analogy}
        </span>
        <p className="text-sm text-white/70 font-body leading-relaxed">
          {model.description}
        </p>

        {/* 80%+ adoption badge for Hybrid */}
        {index === 2 && (
          <motion.span
            className="absolute -top-2 -right-2 text-[10px] font-heading font-bold px-2 py-0.5 rounded-full"
            style={{
              background: hex,
              color: '#0A0E27',
              boxShadow: `0 0 12px ${hex}80`,
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            80%+
          </motion.span>
        )}
      </GlowBox>
    </motion.div>
  );
}

/* ── Empty outline slot ──────────────────────────────────── */

function EmptySlot() {
  return (
    <div className="h-full rounded-lg border border-white/10 border-dashed flex items-center justify-center">
      <span className="text-white/15 text-3xl font-heading">?</span>
    </div>
  );
}

/* ── Main scene ──────────────────────────────────────────── */

export default function DeploymentModels() {
  const { phase } = useSceneProgress({ totalPhases: 5 });

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center px-6 py-12 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-heading font-bold text-white mb-8"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        Deployment Models
      </motion.h2>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl aspect-square max-h-[420px]">
        {deploymentModels.map((model, i) => (
          <div key={model.name} className="min-h-[180px]">
            <AnimatePresence mode="wait">
              {phase >= i + 1 ? (
                <Quadrant key={`q-${i}`} index={i} model={model} />
              ) : (
                <EmptySlot key={`e-${i}`} />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Interactive hint — visible while not all revealed */}
      {phase < 4 && (
        <InteractiveIndicator className="mt-6" />
      )}

      {/* Narration */}
      <Narration text={narrations.scene7} delay={0.4} />
    </motion.div>
  );
}
