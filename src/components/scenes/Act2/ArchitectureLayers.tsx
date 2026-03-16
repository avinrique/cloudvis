'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { useAnimationSpeed } from '@/components/hooks/useAnimationSpeed';
import { architectureLayers, narrations } from '@/lib/content';
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/animations';
import Narration from '@/components/shared/Narration';
import LayerStack from '@/components/shared/LayerStack';
import GlowBox from '@/components/shared/GlowBox';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';

/* ── Animated visuals for each architecture layer ── */

function PhysicalLayer() {
  const leds = Array.from({ length: 12 });
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="120" height="60" viewBox="0 0 120 60">
        <rect x="10" y="10" width="100" height="40" rx="4" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5" opacity={0.6} />
        <rect x="15" y="15" width="90" height="8" rx="2" fill="rgba(59,130,246,0.15)" />
        <rect x="15" y="28" width="90" height="8" rx="2" fill="rgba(59,130,246,0.15)" />
        <rect x="15" y="41" width="90" height="8" rx="2" fill="rgba(59,130,246,0.15)" />
        {leds.map((_, i) => (
          <motion.circle
            key={i}
            cx={22 + (i % 6) * 16}
            cy={i < 6 ? 19 : 45}
            r="2"
            fill="var(--accent-blue)"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: 0.8 + Math.random() * 0.6,
              repeat: Infinity,
              delay: Math.random() * 1.2,
            }}
          />
        ))}
      </svg>
      <span className="text-xs text-dim">Server rack LEDs</span>
    </div>
  );
}

function VirtualizationLayer() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="140" height="70" viewBox="0 0 140 70">
        {/* Single large box splits into 3 */}
        <motion.rect
          x="10" y="10" width="120" height="50" rx="4"
          fill="none" stroke="var(--accent-purple)" strokeWidth="1.5" opacity={0.3}
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        {[0, 1, 2].map((i) => (
          <motion.g key={i}>
            <motion.rect
              x={14 + i * 40}
              y="15"
              width="34"
              height="40"
              rx="3"
              fill="rgba(168,85,247,0.12)"
              stroke="var(--accent-purple)"
              strokeWidth="1.2"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.25 }}
            />
            <motion.text
              x={31 + i * 40}
              y="39"
              fill="var(--accent-purple)"
              fontSize="10"
              textAnchor="middle"
              fontFamily="monospace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.25 }}
            >
              VM{i + 1}
            </motion.text>
          </motion.g>
        ))}
        <motion.line
          x1="47" y1="12" x2="47" y2="58"
          stroke="var(--accent-purple)" strokeWidth="0.8" strokeDasharray="3 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        />
        <motion.line
          x1="87" y1="12" x2="87" y2="58"
          stroke="var(--accent-purple)" strokeWidth="0.8" strokeDasharray="3 3"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        />
      </svg>
      <span className="text-xs text-dim">1 host &rarr; 3 VMs</span>
    </div>
  );
}

function ManagementLayer() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '40px 40px' }}
        >
          {/* Gear shape */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const x1 = 40 + Math.cos(angle) * 22;
            const y1 = 40 + Math.sin(angle) * 22;
            const x2 = 40 + Math.cos(angle) * 30;
            const y2 = 40 + Math.sin(angle) * 30;
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="var(--accent-amber)" strokeWidth="6" strokeLinecap="round" />
            );
          })}
          <circle cx="40" cy="40" r="18" fill="none" stroke="var(--accent-amber)" strokeWidth="3" />
          <circle cx="40" cy="40" r="7" fill="var(--accent-amber)" opacity={0.4} />
        </motion.g>
      </svg>
      <span className="text-xs text-dim">Orchestration</span>
    </div>
  );
}

function NetworkLayer() {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="140" height="40" viewBox="0 0 140 40">
        {[0, 1, 2].map((i) => (
          <motion.line
            key={i}
            x1="10" y1={10 + i * 10}
            x2="130" y2={10 + i * 10}
            stroke="var(--accent-cyan)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.3 }}
            animate={{ pathLength: 1, opacity: [0.3, 1, 0.3] }}
            transition={{
              pathLength: { duration: 0.6, delay: i * 0.15 },
              opacity: { duration: 1.5, repeat: Infinity, delay: i * 0.3 },
            }}
          />
        ))}
        {/* Travelling data packets */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`pkt-${i}`}
            cy={10 + i * 10}
            r="3"
            fill="var(--accent-cyan)"
            animate={{ cx: [10, 130] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
      <span className="text-xs text-dim">Data in transit</span>
    </div>
  );
}

function FrontEndLayer() {
  const devices = [
    // Laptop
    <motion.g key="laptop" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <rect x="5" y="5" width="30" height="20" rx="2" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" />
      <rect x="2" y="25" width="36" height="3" rx="1" fill="var(--accent-green)" opacity={0.5} />
      <rect x="12" y="10" width="16" height="10" rx="1" fill="rgba(34,197,94,0.15)" />
    </motion.g>,
    // Phone
    <motion.g key="phone" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <rect x="52" y="5" width="16" height="26" rx="3" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" />
      <rect x="55" y="9" width="10" height="16" rx="1" fill="rgba(34,197,94,0.15)" />
      <circle cx="60" cy="28" r="1.5" fill="var(--accent-green)" opacity={0.4} />
    </motion.g>,
    // Tablet
    <motion.g key="tablet" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
      <rect x="80" y="5" width="24" height="26" rx="3" fill="none" stroke="var(--accent-green)" strokeWidth="1.5" />
      <rect x="84" y="9" width="16" height="16" rx="1" fill="rgba(34,197,94,0.15)" />
      <circle cx="92" cy="28" r="1.5" fill="var(--accent-green)" opacity={0.4} />
    </motion.g>,
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="110" height="36" viewBox="0 0 110 36">{devices}</svg>
      <span className="text-xs text-dim">Devices everywhere</span>
    </div>
  );
}

const layerVisuals = [PhysicalLayer, VirtualizationLayer, ManagementLayer, NetworkLayer, FrontEndLayer];

/* ── Main Scene ── */

export default function ArchitectureLayers() {
  const { phase } = useSceneProgress({ totalPhases: 6 });
  const allRevealed = phase >= 5;

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-display tracking-wider mb-8"
        variants={fadeInUp}
        style={{ color: 'var(--text-primary)' }}
      >
        Cloud Architecture
      </motion.h2>

      {phase === 0 && (
        <InteractiveIndicator className="mt-4" />
      )}

      {/* Main content — two-column layout */}
      {phase >= 1 && (
        <motion.div
          className="flex flex-col md:flex-row items-start justify-center gap-8 w-full max-w-4xl px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Left: LayerStack */}
          <div className="flex-1 min-w-0">
            <LayerStack
              layers={architectureLayers}
              revealedCount={phase}
              className="w-full"
            />
          </div>

          {/* Right: Animated visuals */}
          <div className="flex-1 flex flex-col-reverse gap-3 items-center">
            <AnimatePresence mode="popLayout">
              {architectureLayers.map((layer, i) => {
                if (i >= phase) return null;
                const Visual = layerVisuals[i];
                return (
                  <motion.div
                    key={layer.name}
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <GlowBox
                      color={`var(--accent-${layer.color})`}
                      pulse={allRevealed}
                      className="flex items-center justify-center min-h-[80px]"
                    >
                      <Visual />
                    </GlowBox>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Badge: 1 server = 10-20+ VMs */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="absolute top-6 right-6 rounded-full border px-4 py-1.5 text-xs font-mono"
            initial={{ opacity: 0, scale: 0, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              borderColor: 'var(--accent-purple)',
              color: 'var(--accent-purple)',
              background: 'rgba(168,85,247,0.08)',
              boxShadow: '0 0 16px rgba(168,85,247,0.25)',
            }}
          >
            1 server = 10&ndash;20+ VMs
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unified pulse overlay when all revealed */}
      {allRevealed && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-lg"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.06, 0],
            boxShadow: [
              'inset 0 0 60px rgba(255,255,255,0)',
              'inset 0 0 100px rgba(255,255,255,0.08)',
              'inset 0 0 60px rgba(255,255,255,0)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ background: 'transparent' }}
        />
      )}

      {/* Narration */}
      <Narration text={narrations.scene5} delay={0.5} />
    </motion.div>
  );
}
