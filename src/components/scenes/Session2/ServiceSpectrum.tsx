'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, staggerContainer, cinematicReveal } from '@/lib/animations';
import { narrations, serviceModels } from '@/lib/content';
import Narration from '@/components/shared/Narration';

const SPECTRUM_COLORS = ['#3B82F6', '#A855F7', '#06B6D4'];

function SpectrumBar() {
  return (
    <motion.div className="relative w-full max-w-2xl">
      {/* Track */}
      <motion.div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #3B82F6, #A855F7, #06B6D4)' }}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      {/* Glow sweep */}
      <motion.div
        className="absolute top-0 h-2 w-20 rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          filter: 'blur(4px)',
        }}
        initial={{ left: '-10%' }}
        animate={{ left: '110%' }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
      />
      {/* Labels */}
      <div className="flex justify-between mt-3 px-1">
        {['You manage everything', 'Shared responsibility', 'Provider manages all'].map((label, i) => (
          <motion.span
            key={label}
            className="text-[10px] font-body text-white/40"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
          >
            {label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function ServiceCard({
  model,
  index,
  color,
}: {
  model: (typeof serviceModels)[number];
  index: number;
  color: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center p-5 rounded-xl border border-white/10 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}08, rgba(17,22,51,0.7))`,
      }}
      variants={fadeInUp}
    >
      {/* Animated accent line at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Icon circle with breathing glow */}
      <motion.div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-3 relative"
        style={{ background: `${color}10`, border: `1.5px solid ${color}30` }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              `0 0 15px ${color}20, inset 0 0 15px ${color}10`,
              `0 0 30px ${color}40, inset 0 0 20px ${color}20`,
              `0 0 15px ${color}20, inset 0 0 15px ${color}10`,
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="text-2xl font-display font-bold relative z-10" style={{ color }}>
          {model.name.charAt(0)}
        </span>
      </motion.div>

      <h3 className="text-lg font-display font-bold mb-0.5" style={{ color }}>
        {model.name}
      </h3>
      <p className="text-[10px] text-white/30 font-body mb-2">{model.fullName}</p>
      <p className="text-sm text-white/60 font-body text-center leading-relaxed">
        {model.description}
      </p>

      {/* Pizza analogy with slide-in */}
      <motion.div
        className="mt-3 px-3 py-2 rounded-md border border-white/5 w-full"
        style={{ background: 'rgba(17,22,51,0.5)' }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 + index * 0.15, duration: 0.5 }}
      >
        <span className="text-[9px] uppercase tracking-widest text-white/25 font-body block mb-0.5">
          Pizza Analogy
        </span>
        <span className="text-xs text-amber-300/80 font-body italic">
          &ldquo;{model.pizza}&rdquo;
        </span>
      </motion.div>

      {/* Example */}
      <motion.span
        className="mt-2 text-[11px] font-code"
        style={{ color: `${color}80` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 + index * 0.15 }}
      >
        {model.examples.split(',')[0]}
      </motion.span>
    </motion.div>
  );
}

export default function ServiceSpectrum() {
  const { phase } = useSceneProgress({ totalPhases: 3, autoAdvance: [2500, 3000, 4000] });

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center px-6 py-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-display font-bold text-white mb-1"
        variants={cinematicReveal}
        initial="hidden"
        animate="visible"
      >
        The Service Spectrum
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        From raw infrastructure to ready-made software
      </motion.p>

      {/* Spectrum bar - always visible */}
      <motion.div className="w-full flex flex-col items-center mb-8">
        <SpectrumBar />
      </motion.div>

      {/* Service cards - appear at phase 1 */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="grid grid-cols-3 gap-5 w-full max-w-3xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {serviceModels.map((model, i) => (
              <ServiceCard key={model.name} model={model} index={i} color={SPECTRUM_COLORS[i]} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Narration text={narrations.scene2} delay={0.4} />
    </motion.div>
  );
}
