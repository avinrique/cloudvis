'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { narrations, realWorldLayers } from '@/lib/content';
import Narration from '@/components/shared/Narration';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';

const TYPE_COLORS: Record<string, string> = {
  SaaS: '#06B6D4',
  PaaS: '#A855F7',
  IaaS: '#3B82F6',
  'IaaS/PaaS': '#8B5CF6',
  Serverless: '#22C55E',
};

function LayerRow({
  layer,
  index,
  total,
}: {
  layer: (typeof realWorldLayers)[number];
  index: number;
  total: number;
}) {
  const typeColor = TYPE_COLORS[layer.type] || '#6B7394';

  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-b-0"
      variants={fadeInUp}
    >
      {/* Connection line + dot */}
      <div className="flex flex-col items-center w-6 shrink-0">
        <motion.div
          className="w-3 h-3 rounded-full"
          style={{ background: layer.color, boxShadow: `0 0 8px ${layer.color}60` }}
          animate={{
            boxShadow: [
              `0 0 8px ${layer.color}40`,
              `0 0 16px ${layer.color}60`,
              `0 0 8px ${layer.color}40`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
        {index < total - 1 && (
          <motion.div
            className="w-px h-6 mt-1"
            style={{ background: `${layer.color}30` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3 }}
          />
        )}
      </div>

      {/* Service info */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-display font-bold text-white">{layer.service}</span>
          <span
            className="text-[9px] px-1.5 py-0.5 rounded-full font-code"
            style={{ color: typeColor, background: `${typeColor}15`, border: `1px solid ${typeColor}30` }}
          >
            {layer.type}
          </span>
        </div>
        <p className="text-xs text-white/40 font-body">{layer.description}</p>
      </div>

      {/* Color bar */}
      <motion.div
        className="w-1.5 h-8 rounded-full"
        style={{ background: layer.color }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.2 }}
      />
    </motion.div>
  );
}

function ArchDiagram() {
  return (
    <motion.div
      className="flex flex-col items-center gap-1 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <svg width="320" height="70" viewBox="0 0 320 70" fill="none">
        {/* User */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <circle cx="30" cy="25" r="10" stroke="white" strokeWidth="1" opacity="0.3" />
          <circle cx="30" cy="20" r="5" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <text x="30" y="50" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" opacity="0.3">User</text>
        </motion.g>

        {/* Arrow chain */}
        {[
          { x: 65, label: 'CDN', color: '#F6821F' },
          { x: 120, label: 'Frontend', color: '#FFFFFF' },
          { x: 180, label: 'API', color: '#A855F7' },
          { x: 240, label: 'DB', color: '#3B82F6' },
          { x: 290, label: 'Storage', color: '#FF9900' },
        ].map((node, i) => (
          <motion.g key={node.label}>
            <motion.rect
              x={node.x - 20} y="15" width="40" height="20" rx="4"
              stroke={node.color} strokeWidth="1" fill={`${node.color}10`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 200 }}
            />
            <motion.text
              x={node.x} y="29" textAnchor="middle" fill={node.color} fontSize="7" fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.5 + i * 0.15 }}
            >
              {node.label}
            </motion.text>
            {i < 4 && (
              <motion.line
                x1={node.x + 20} y1="25" x2={node.x + 35} y2="25"
                stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.2 }}
              />
            )}
          </motion.g>
        ))}

        {/* Arrow from user */}
        <motion.line
          x1="40" y1="25" x2="45" y2="25"
          stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: 0.3 }}
        />
      </svg>
    </motion.div>
  );
}

export default function RealWorldArch() {
  const { phase } = useSceneProgress({ totalPhases: 3 });

  // Show layers progressively
  const visibleLayers = phase === 0 ? 0 : phase === 1 ? 4 : realWorldLayers.length;

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
        Real-World Architecture
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        How a modern streaming service is built
      </motion.p>

      {/* Arch flow diagram */}
      {phase >= 0 && <ArchDiagram />}

      {/* Service layers list */}
      <AnimatePresence>
        {visibleLayers > 0 && (
          <motion.div
            className="w-full max-w-xl mt-4 rounded-xl border border-white/10 overflow-hidden"
            style={{ background: 'rgba(17,22,51,0.7)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              {realWorldLayers.slice(0, visibleLayers).map((layer, i) => (
                <LayerRow key={layer.service} layer={layer} index={i} total={visibleLayers} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="flex flex-wrap gap-3 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
                <span className="text-[10px] text-white/40 font-body">{type}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {phase < 2 && <InteractiveIndicator className="mt-4" />}
      <Narration text={narrations.scene11} delay={0.4} />
    </motion.div>
  );
}
