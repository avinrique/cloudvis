'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, staggerContainer, cinematicReveal } from '@/lib/animations';
import { narrations, realWorldLayers } from '@/lib/content';
import Narration from '@/components/shared/Narration';

const TYPE_COLORS: Record<string, string> = {
  SaaS: '#06B6D4',
  PaaS: '#A855F7',
  IaaS: '#3B82F6',
  'IaaS/PaaS': '#8B5CF6',
  Serverless: '#22C55E',
};

function LayerRow({ layer, index, total }: { layer: (typeof realWorldLayers)[number]; index: number; total: number }) {
  const typeColor = TYPE_COLORS[layer.type] || '#6B7394';

  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-3 border-b border-white/5 last:border-b-0 relative overflow-hidden"
      variants={fadeInUp}
    >
      {/* Sweep glow on entry */}
      <motion.div className="absolute inset-0 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${layer.color}08, transparent)` }}
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }} />

      <div className="flex flex-col items-center w-6 shrink-0">
        <motion.div className="w-3 h-3 rounded-full relative"
          style={{ background: layer.color }}
          animate={{
            boxShadow: [`0 0 6px ${layer.color}40`, `0 0 14px ${layer.color}70`, `0 0 6px ${layer.color}40`],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}>
        </motion.div>
        {index < total - 1 && (
          <motion.div className="w-px h-6 mt-1" style={{ background: `${layer.color}30` }}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.3 }} />
        )}
      </div>

      <div className="flex-1 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-sm font-display font-bold text-white">{layer.service}</span>
          <motion.span
            className="text-[9px] px-1.5 py-0.5 rounded-full font-code"
            style={{ color: typeColor, background: `${typeColor}15`, border: `1px solid ${typeColor}30` }}
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05, type: 'spring', stiffness: 300 }}>
            {layer.type}
          </motion.span>
        </div>
        <p className="text-xs text-white/40 font-body">{layer.description}</p>
      </div>

      <motion.div className="w-1.5 h-8 rounded-full relative z-10" style={{ background: layer.color }}
        initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.2, duration: 0.4 }} />
    </motion.div>
  );
}

function ArchDiagram() {
  const nodes = [
    { x: 30, label: 'User', color: '#FFFFFF' },
    { x: 75, label: 'CDN', color: '#F6821F' },
    { x: 130, label: 'Frontend', color: '#FFFFFF' },
    { x: 190, label: 'API', color: '#A855F7' },
    { x: 245, label: 'DB', color: '#3B82F6' },
    { x: 300, label: 'Storage', color: '#FF9900' },
  ];

  return (
    <motion.div className="flex flex-col items-center gap-1 mt-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      <svg width="340" height="70" viewBox="0 0 340 70" fill="none">
        {/* User icon */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <circle cx="30" cy="20" r="8" stroke="white" strokeWidth="1" opacity="0.3" />
          <circle cx="30" cy="16" r="4" stroke="white" strokeWidth="0.8" opacity="0.3" />
          <text x="30" y="42" textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace" opacity="0.3">User</text>
        </motion.g>

        {/* Nodes */}
        {nodes.slice(1).map((node, i) => (
          <motion.g key={node.label}>
            <motion.rect
              x={node.x - 22} y="10" width="44" height="22" rx="5"
              stroke={node.color} strokeWidth="1" fill={`${node.color}08`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
            />
            <motion.text x={node.x} y="25" textAnchor="middle" fill={node.color} fontSize="7" fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.5 + i * 0.15 }}>
              {node.label}
            </motion.text>
          </motion.g>
        ))}

        {/* Connecting lines with animated dots */}
        {nodes.slice(0, -1).map((node, i) => {
          const next = nodes[i + 1];
          return (
            <motion.g key={`conn-${i}`}>
              <motion.line
                x1={node.x + (i === 0 ? 8 : 22)} y1="21" x2={next.x - 22} y2="21"
                stroke="white" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.15"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.3 }} />
              <motion.circle r="1.5" fill={next.color}
                animate={{
                  cx: [node.x + (i === 0 ? 8 : 22), next.x - 22],
                  cy: [21, 21],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 1.5 + i * 0.3, repeatDelay: 0.8 }} />
            </motion.g>
          );
        })}
      </svg>
    </motion.div>
  );
}

export default function RealWorldArch() {
  const { phase } = useSceneProgress({ totalPhases: 3, autoAdvance: [2500, 3000, 4000] });

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
        variants={cinematicReveal}
        initial="hidden"
        animate="visible"
      >
        Real-World Architecture
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        How a modern streaming service is built
      </motion.p>

      <ArchDiagram />

      <AnimatePresence>
        {visibleLayers > 0 && (
          <motion.div
            className="w-full max-w-xl mt-4 rounded-xl border border-white/10 overflow-hidden"
            style={{ background: 'rgba(17,22,51,0.7)' }}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              {realWorldLayers.slice(0, visibleLayers).map((layer, i) => (
                <LayerRow key={layer.service} layer={layer} index={i} total={visibleLayers} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 2 && (
          <motion.div className="flex flex-wrap gap-3 mt-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {Object.entries(TYPE_COLORS).map(([type, color]) => (
              <motion.div key={type} className="flex items-center gap-1.5"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
                <motion.div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-[10px] text-white/40 font-body">{type}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Narration text={narrations.scene11} delay={0.4} />
    </motion.div>
  );
}
