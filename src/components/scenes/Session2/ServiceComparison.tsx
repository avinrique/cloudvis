'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, staggerContainer, cinematicReveal } from '@/lib/animations';
import { narrations, comparisonCriteria } from '@/lib/content';
import Narration from '@/components/shared/Narration';

const COLORS = {
  iaas: '#3B82F6',
  paas: '#A855F7',
  saas: '#06B6D4',
};

function ComparisonRow({
  row,
  index,
}: {
  row: (typeof comparisonCriteria)[number];
  index: number;
}) {
  return (
    <motion.tr
      variants={fadeInUp}
      className="border-b border-white/5 last:border-b-0"
    >
      <td className="py-3 px-3 text-sm font-display font-bold text-white/80">{row.criteria}</td>
      <td className="py-3 px-3 text-xs font-body text-center" style={{ color: COLORS.iaas }}>
        {row.iaas}
      </td>
      <td className="py-3 px-3 text-xs font-body text-center" style={{ color: COLORS.paas }}>
        {row.paas}
      </td>
      <td className="py-3 px-3 text-xs font-body text-center" style={{ color: COLORS.saas }}>
        {row.saas}
      </td>
    </motion.tr>
  );
}

function DecisionHelper() {
  const decisions = [
    { question: 'Need full OS control?', answer: 'IaaS', color: COLORS.iaas },
    { question: 'Just want to deploy code?', answer: 'PaaS', color: COLORS.paas },
    { question: 'Need ready-made tools?', answer: 'SaaS', color: COLORS.saas },
  ];

  return (
    <motion.div
      className="flex gap-4 mt-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {decisions.map((d, i) => (
        <motion.div
          key={d.answer}
          className="relative flex-1 p-4 rounded-lg border border-white/10 text-center overflow-hidden"
          style={{ background: `${d.color}08`, borderColor: `${d.color}30` }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2, type: 'spring', stiffness: 200, damping: 15 }}
        >
          {/* Shimmer sweep overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(105deg, transparent 40%, ${d.color}15 50%, transparent 60%)`,
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 1.5,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
          <p className="text-xs text-white/50 font-body mb-2">{d.question}</p>
          <motion.span
            className="text-xl font-display font-bold"
            style={{ color: d.color }}
            animate={{
              textShadow: [
                `0 0 10px ${d.color}40`,
                `0 0 20px ${d.color}60`,
                `0 0 10px ${d.color}40`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            → {d.answer}
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function ServiceComparison() {
  const { phase } = useSceneProgress({ totalPhases: 3, autoAdvance: [3000, 2500, 4000] });

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
        IaaS vs PaaS vs SaaS
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Choosing the right service model
      </motion.p>

      {/* Phase 0+: Comparison table */}
      <AnimatePresence>
        {phase >= 0 && (
          <motion.div
            className="w-full max-w-3xl rounded-xl border border-white/10 overflow-hidden"
            style={{ background: 'rgba(17,22,51,0.7)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-3 text-left text-xs text-white/30 font-body">Criteria</th>
                  <th className="py-3 px-3 text-center text-sm font-display font-bold" style={{ color: COLORS.iaas }}>
                    IaaS
                  </th>
                  <th className="py-3 px-3 text-center text-sm font-display font-bold" style={{ color: COLORS.paas }}>
                    PaaS
                  </th>
                  <th className="py-3 px-3 text-center text-sm font-display font-bold" style={{ color: COLORS.saas }}>
                    SaaS
                  </th>
                </tr>
              </thead>
              <motion.tbody variants={staggerContainer} initial="hidden" animate="visible">
                {comparisonCriteria
                  .slice(0, phase >= 1 ? comparisonCriteria.length : 3)
                  .map((row, i) => (
                    <ComparisonRow key={row.criteria} row={row} index={i} />
                  ))}
              </motion.tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Decision helper */}
      <AnimatePresence>
        {phase >= 2 && <DecisionHelper />}
      </AnimatePresence>

      <Narration text={narrations.scene6} delay={0.4} />
    </motion.div>
  );
}
