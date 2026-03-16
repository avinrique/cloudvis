'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, slideInLeft, slideInRight } from '@/lib/animations';
import { narrations, serviceModels } from '@/lib/content';
import Narration from '@/components/shared/Narration';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';

/* ── Constants ───────────────────────────────────────────── */

const ALL_LAYERS = [
  'Applications',
  'Data',
  'Runtime',
  'Middleware',
  'OS',
  'Virtualization',
  'Servers',
  'Storage',
  'Networking',
] as const;

const PROVIDER_COLOR = '#3B82F6'; // blue
const USER_COLOR = '#F97316';     // orange

const columnColors = ['#3B82F6', '#A855F7', '#06B6D4'] as const;

/* ── Pizza analogy panel ─────────────────────────────────── */

function PizzaPanel({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.div
      className="mt-2 rounded-md border border-white/10 px-3 py-2 text-center"
      style={{
        background: 'linear-gradient(135deg, rgba(17,22,51,0.8), rgba(17,22,51,0.5))',
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
    >
      <span className="text-[10px] uppercase tracking-widest text-white/40 font-body block mb-0.5">
        Pizza Analogy
      </span>
      <span className="text-xs text-amber-300 font-body italic">&ldquo;{text}&rdquo;</span>
    </motion.div>
  );
}

/* ── Tiny user icon for SaaS column ──────────────────────── */

function TinyUserIcon() {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F97316"
      strokeWidth="2"
      strokeLinecap="round"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 18 }}
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
    </motion.svg>
  );
}

/* ── Single layer bar ────────────────────────────────────── */

function LayerBar({
  label,
  managed,
  colIndex,
  layerIndex,
}: {
  label: string;
  managed: 'provider' | 'user';
  colIndex: number;
  layerIndex: number;
}) {
  const bg = managed === 'provider' ? PROVIDER_COLOR : USER_COLOR;

  return (
    <motion.div
      className="w-full px-2 py-[5px] text-[10px] font-body font-medium text-center truncate select-none"
      style={{
        backgroundColor: `${bg}25`,
        borderLeft: `3px solid ${bg}`,
        color: managed === 'provider' ? '#93C5FD' : '#FDBA74',
      }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{
        delay: 0.06 * (ALL_LAYERS.length - layerIndex) + colIndex * 0.05,
        duration: 0.3,
        ease: 'easeOut',
      }}
    >
      {label}
    </motion.div>
  );
}

/* ── Column (IaaS / PaaS / SaaS) ────────────────────────── */

function ServiceColumn({
  model,
  colIndex,
}: {
  model: typeof serviceModels[number];
  colIndex: number;
}) {
  const accent = columnColors[colIndex];

  return (
    <motion.div
      className="flex flex-col items-center"
      variants={colIndex === 0 ? slideInLeft : colIndex === 2 ? slideInRight : fadeInUp}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="mb-2 text-center">
        <h3 className="text-lg font-heading font-bold" style={{ color: accent }}>
          {model.name}
        </h3>
        <span className="text-[10px] text-white/40 font-body">{model.fullName}</span>
      </div>

      {/* Layer stack */}
      <div
        className="w-full rounded-md border border-white/10 overflow-hidden flex flex-col-reverse"
        style={{
          background: 'rgba(10,14,39,0.6)',
          minHeight: '270px',
        }}
      >
        {ALL_LAYERS.slice()
          .reverse()
          .map((layer, ri) => {
            const layerIndex = ALL_LAYERS.length - 1 - ri;
            const isProvider = model.providerManages.includes(layer);
            return (
              <LayerBar
                key={layer}
                label={layer}
                managed={isProvider ? 'provider' : 'user'}
                colIndex={colIndex}
                layerIndex={layerIndex}
              />
            );
          })}
      </div>

      {/* SaaS tiny user icon */}
      {model.userManages.length === 0 && (
        <div className="mt-1 flex items-center gap-1">
          <TinyUserIcon />
          <span className="text-[9px] text-orange-300/60 font-body">just you</span>
        </div>
      )}

      {/* Example label */}
      <motion.span
        className="mt-2 text-xs font-body text-white/50 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        e.g. {model.examples.split(',')[0]}
      </motion.span>

      {/* Pizza analogy */}
      <PizzaPanel text={model.pizza} delay={0.7 + colIndex * 0.15} />
    </motion.div>
  );
}

/* ── Empty column placeholder (phase 0) ──────────────────── */

function EmptyColumn({ index }: { index: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 h-8" />
      <div
        className="w-full rounded-md border border-white/10 border-dashed overflow-hidden flex flex-col-reverse"
        style={{ minHeight: '270px', background: 'rgba(10,14,39,0.3)' }}
      >
        {ALL_LAYERS.slice()
          .reverse()
          .map((layer) => (
            <div
              key={layer}
              className="w-full px-2 py-[5px] text-[10px] font-body text-white/15 text-center truncate border-b border-white/5 last:border-b-0"
            >
              {layer}
            </div>
          ))}
      </div>
    </div>
  );
}

/* ── Legend ────────────────────────────────────────────────── */

function Legend() {
  return (
    <motion.div
      className="flex items-center gap-6 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: `${PROVIDER_COLOR}40`, border: `2px solid ${PROVIDER_COLOR}` }} />
        <span className="text-[10px] text-white/50 font-body">Provider Managed</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: `${USER_COLOR}40`, border: `2px solid ${USER_COLOR}` }} />
        <span className="text-[10px] text-white/50 font-body">You Manage</span>
      </div>
    </motion.div>
  );
}

/* ── Main scene ──────────────────────────────────────────── */

export default function ServiceModels() {
  const { phase } = useSceneProgress({ totalPhases: 4 });

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center px-6 py-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-heading font-bold text-white mb-2"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        Service Models
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        IaaS &middot; PaaS &middot; SaaS
      </motion.p>

      {/* Three columns */}
      <div className="grid grid-cols-3 gap-5 w-full max-w-3xl">
        {serviceModels.map((model, i) => (
          <AnimatePresence key={model.name} mode="wait">
            {phase >= i + 1 ? (
              <ServiceColumn key={`col-${i}`} model={model} colIndex={i} />
            ) : (
              <EmptyColumn key={`empty-${i}`} index={i} />
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Legend */}
      {phase >= 1 && <Legend />}

      {/* Interactive hint */}
      {phase < 3 && (
        <InteractiveIndicator className="mt-4" />
      )}

      {/* Narration */}
      <Narration text={narrations.scene8} delay={0.4} />
    </motion.div>
  );
}
