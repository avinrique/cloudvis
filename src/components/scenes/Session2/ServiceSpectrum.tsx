'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/animations';
import { narrations, serviceModels } from '@/lib/content';
import Narration from '@/components/shared/Narration';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';

const SPECTRUM_COLORS = ['#3B82F6', '#A855F7', '#06B6D4'];

function SpectrumBar() {
  return (
    <motion.div
      className="relative w-full max-w-2xl h-3 rounded-full overflow-hidden"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{ transformOrigin: 'left' }}
    >
      <div className="absolute inset-0 flex">
        <div className="flex-1" style={{ background: 'linear-gradient(90deg, #3B82F6, #A855F7)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(90deg, #A855F7, #06B6D4)' }} />
      </div>
    </motion.div>
  );
}

function ControlSlider({ phase }: { phase: number }) {
  const labels = ['More Control', 'Balanced', 'More Convenience'];
  return (
    <div className="flex justify-between w-full max-w-2xl mt-2 px-1">
      {labels.map((label, i) => (
        <motion.span
          key={label}
          className="text-[10px] font-body"
          style={{ color: phase >= 1 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.15 }}
        >
          {label}
        </motion.span>
      ))}
    </div>
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
      className="flex flex-col items-center p-5 rounded-xl border border-white/10"
      style={{
        background: `linear-gradient(135deg, ${color}15, rgba(17,22,51,0.7))`,
        boxShadow: `0 0 20px ${color}20`,
      }}
      variants={fadeInUp}
    >
      <motion.div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
        style={{ background: `${color}20`, border: `2px solid ${color}50` }}
        animate={{
          boxShadow: [
            `0 0 10px ${color}30`,
            `0 0 25px ${color}50`,
            `0 0 10px ${color}30`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xl font-display font-bold" style={{ color }}>
          {model.name.charAt(0)}
        </span>
      </motion.div>
      <h3 className="text-lg font-display font-bold mb-1" style={{ color }}>
        {model.name}
      </h3>
      <p className="text-xs text-white/40 font-body mb-2">{model.fullName}</p>
      <p className="text-sm text-white/70 font-body text-center leading-relaxed">
        {model.description}
      </p>
      <motion.div
        className="mt-3 px-3 py-1.5 rounded-md border border-white/10"
        style={{ background: 'rgba(17,22,51,0.5)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-[10px] text-amber-300 font-body italic">
          &ldquo;{model.pizza}&rdquo;
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function ServiceSpectrum() {
  const { phase } = useSceneProgress({ totalPhases: 3 });

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
        The Service Spectrum
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        From raw infrastructure to ready-made software
      </motion.p>

      {/* Spectrum bar */}
      <AnimatePresence>
        {phase >= 0 && (
          <motion.div className="w-full flex flex-col items-center mb-8">
            <SpectrumBar />
            <ControlSlider phase={phase} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Service cards */}
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

      {/* Examples */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="flex gap-8 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {serviceModels.map((model, i) => (
              <div key={model.name} className="text-center">
                <span className="text-xs font-body" style={{ color: SPECTRUM_COLORS[i] }}>
                  {model.examples.split(',')[0]}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {phase < 2 && <InteractiveIndicator className="mt-6" />}
      <Narration text={narrations.scene2} delay={0.4} />
    </motion.div>
  );
}
