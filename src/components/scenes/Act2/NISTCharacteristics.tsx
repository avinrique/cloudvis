'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { useAnimationSpeed } from '@/components/hooks/useAnimationSpeed';
import { nistCharacteristics, narrations } from '@/lib/content';
import { fadeInUp, scaleIn, staggerContainer } from '@/lib/animations';
import Narration from '@/components/shared/Narration';
import GlowBox from '@/components/shared/GlowBox';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';

/* ── Pentagon geometry ── */
const CX = 200;
const CY = 190;
const RADIUS = 140;
const LABEL_RADIUS = 180;

function pentagonPoint(index: number, radius: number) {
  // Start from top (-90deg) and go clockwise
  const angle = ((2 * Math.PI) / 5) * index - Math.PI / 2;
  return {
    x: CX + radius * Math.cos(angle),
    y: CY + radius * Math.sin(angle),
  };
}

function pentagonPath(radius: number) {
  return Array.from({ length: 5 })
    .map((_, i) => {
      const { x, y } = pentagonPoint(i, radius);
      return `${i === 0 ? 'M' : 'L'}${x},${y}`;
    })
    .join(' ') + ' Z';
}

/* ── Node icon animations ── */

function OnDemandIcon() {
  // Vending machine: rectangle drops into hand shape
  return (
    <g>
      {/* Machine body */}
      <rect x="-10" y="-12" width="20" height="16" rx="2"
        fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="-6" y="-9" width="5" height="5" rx="1"
        fill="currentColor" opacity={0.25} />
      <rect x="1" y="-9" width="5" height="5" rx="1"
        fill="currentColor" opacity={0.25} />
      {/* Dropping item */}
      <motion.rect
        x="-3" y="-8" width="6" height="6" rx="1"
        fill="currentColor" opacity={0.7}
        animate={{ y: [-8, 10] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeIn' }}
      />
      {/* Hand shape */}
      <path d="M-8 16 Q-8 12 -4 12 L4 12 Q8 12 8 16 L6 20 L-6 20 Z"
        fill="none" stroke="currentColor" strokeWidth="1.2" opacity={0.6} />
    </g>
  );
}

function BroadAccessIcon() {
  // Radio tower: concentric circles expand outward
  return (
    <g>
      {/* Tower */}
      <line x1="0" y1="-8" x2="0" y2="14" stroke="currentColor" strokeWidth="2" />
      <line x1="-6" y1="14" x2="6" y2="14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="0" cy="-10" r="2" fill="currentColor" />
      {/* Concentric waves */}
      {[12, 20, 28].map((r, i) => (
        <motion.circle
          key={i}
          cx="0" cy="-10" r={r}
          fill="none" stroke="currentColor" strokeWidth="1"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0.6, 0], scale: [0.6, 1.2] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeOut',
          }}
          style={{ transformOrigin: '0px -10px' }}
        />
      ))}
    </g>
  );
}

function ResourcePoolIcon() {
  // Overlapping circles — Venn diagram
  return (
    <g>
      {[
        { cx: -7, cy: -3, color: 0.5 },
        { cx: 7, cy: -3, color: 0.4 },
        { cx: 0, cy: 6, color: 0.3 },
      ].map((c, i) => (
        <motion.circle
          key={i}
          cx={c.cx} cy={c.cy} r="11"
          fill="currentColor" fillOpacity={0.1}
          stroke="currentColor" strokeWidth="1.2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.2, type: 'spring', stiffness: 200 }}
          style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
        />
      ))}
      {/* Center glow */}
      <motion.circle
        cx="0" cy="0" r="4"
        fill="currentColor" opacity={0.35}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </g>
  );
}

function ElasticityIcon() {
  // Vertical bar stretching up and down
  return (
    <g>
      {/* Base marks */}
      <line x1="-10" y1="14" x2="10" y2="14" stroke="currentColor" strokeWidth="1" opacity={0.3} />
      <line x1="-10" y1="-14" x2="10" y2="-14" stroke="currentColor" strokeWidth="1" opacity={0.3} />
      {/* Stretching bar */}
      <motion.rect
        x="-5" y="0" width="10" height="8" rx="2"
        fill="currentColor" opacity={0.6}
        animate={{
          y: [-14, 6, -6, 2, -14],
          height: [8, 18, 10, 14, 8],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Arrow hints */}
      <motion.path
        d="M0 -18 L-3 -14 L3 -14 Z"
        fill="currentColor" opacity={0.4}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.path
        d="M0 22 L-3 18 L3 18 Z"
        fill="currentColor" opacity={0.4}
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </g>
  );
}

function MeasuredIcon() {
  // Rotating meter gauge needle
  return (
    <g>
      {/* Gauge arc */}
      <path
        d="M-16 8 A18 18 0 0 1 16 8"
        fill="none" stroke="currentColor" strokeWidth="1.5" opacity={0.4}
      />
      {/* Tick marks */}
      {[-140, -110, -80, -50, -20].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = Math.cos(rad) * 14;
        const y1 = 8 + Math.sin(rad) * 14;
        const x2 = Math.cos(rad) * 18;
        const y2 = 8 + Math.sin(rad) * 18;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="currentColor" strokeWidth="1.2" opacity={0.5} />
        );
      })}
      {/* Needle */}
      <motion.line
        x1="0" y1="8" x2="0" y2="-8"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        animate={{ rotate: [-60, 30, -20, 40, -60] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '0px 8px' }}
      />
      {/* Center dot */}
      <circle cx="0" cy="8" r="2.5" fill="currentColor" />
      {/* $ label */}
      <text x="0" y="-14" fill="currentColor" fontSize="8"
        textAnchor="middle" fontFamily="monospace" opacity={0.6}>$</text>
    </g>
  );
}

const nodeIcons = [OnDemandIcon, BroadAccessIcon, ResourcePoolIcon, ElasticityIcon, MeasuredIcon];

const nodeColors = [
  'var(--accent-blue)',
  'var(--accent-cyan)',
  'var(--accent-purple)',
  'var(--accent-amber)',
  'var(--accent-green)',
];

/* ── Main Scene ── */

export default function NISTCharacteristics() {
  const { phase } = useSceneProgress({ totalPhases: 6 });
  const allRevealed = phase >= 5;

  const pentagonPoints = useMemo(
    () => Array.from({ length: 5 }, (_, i) => pentagonPoint(i, RADIUS)),
    []
  );

  const labelPoints = useMemo(
    () => Array.from({ length: 5 }, (_, i) => pentagonPoint(i, LABEL_RADIUS)),
    []
  );

  const pentagonPerimeter = useMemo(() => {
    // Approximate pentagon perimeter for dasharray
    let len = 0;
    for (let i = 0; i < 5; i++) {
      const a = pentagonPoints[i];
      const b = pentagonPoints[(i + 1) % 5];
      len += Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }
    return len;
  }, [pentagonPoints]);

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-display tracking-wider mb-2"
        variants={fadeInUp}
        style={{ color: 'var(--text-primary)' }}
      >
        NIST 5 Characteristics
      </motion.h2>

      {phase === 0 && (
        <InteractiveIndicator className="mt-2 mb-4" />
      )}

      {/* Pentagon SVG */}
      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-[480px] h-auto"
        style={{ overflow: 'visible' }}
      >
        {/* Pentagon outline — draws in at phase 0 */}
        <motion.path
          d={pentagonPath(RADIUS)}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
          initial={{ strokeDasharray: pentagonPerimeter, strokeDashoffset: pentagonPerimeter }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* Connecting lines illuminate when all revealed */}
        {allRevealed && (
          <motion.path
            d={pentagonPath(RADIUS)}
            fill="none"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              stroke: ['rgba(255,215,0,0.3)', 'rgba(255,215,0,0.7)', 'rgba(255,215,0,0.3)'],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Interior connecting lines (star pattern) when all revealed */}
        {allRevealed &&
          pentagonPoints.map((p, i) => {
            const target = pentagonPoints[(i + 2) % 5];
            return (
              <motion.line
                key={`star-${i}`}
                x1={p.x} y1={p.y} x2={target.x} y2={target.y}
                stroke="rgba(255,215,0,0.15)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              />
            );
          })}

        {/* Nodes */}
        {nistCharacteristics.map((char, i) => {
          const isRevealed = i < phase;
          const point = pentagonPoints[i];
          const label = labelPoints[i];
          const Icon = nodeIcons[i];
          const color = nodeColors[i];

          return (
            <g key={char.name}>
              <AnimatePresence>
                {isRevealed && (
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    style={{ transformOrigin: `${point.x}px ${point.y}px` }}
                  >
                    {/* Outer glow ring */}
                    <motion.circle
                      cx={point.x} cy={point.y} r="34"
                      fill="none" stroke={color} strokeWidth="1"
                      opacity={0.2}
                      animate={allRevealed ? {
                        opacity: [0.2, 0.5, 0.2],
                        r: [34, 38, 34] as unknown as number,
                      } : undefined}
                      transition={allRevealed ? { duration: 2, repeat: Infinity } : undefined}
                    />

                    {/* Node circle background */}
                    <circle
                      cx={point.x} cy={point.y} r="30"
                      fill="rgba(10,14,39,0.9)"
                      stroke={color}
                      strokeWidth="2"
                    />

                    {/* Icon */}
                    <g
                      transform={`translate(${point.x}, ${point.y})`}
                      style={{ color }}
                    >
                      <Icon />
                    </g>

                    {/* Label */}
                    <text
                      x={label.x}
                      y={label.y + 4}
                      fill={color}
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                      fontFamily="var(--font-display, system-ui)"
                    >
                      {char.name.split(' ').length > 2 ? (
                        <>
                          <tspan x={label.x} dy="-0.4em">
                            {char.name.split(' ').slice(0, 2).join(' ')}
                          </tspan>
                          <tspan x={label.x} dy="1.2em">
                            {char.name.split(' ').slice(2).join(' ')}
                          </tspan>
                        </>
                      ) : (
                        char.name
                      )}
                    </text>

                    {/* Small description */}
                    <text
                      x={label.x}
                      y={label.y + (char.name.split(' ').length > 2 ? 22 : 18)}
                      fill="var(--text-dim)"
                      fontSize="7"
                      textAnchor="middle"
                      opacity={0.7}
                    >
                      {char.description.length > 42
                        ? char.description.slice(0, 40) + '...'
                        : char.description}
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Placeholder dots for unrevealed nodes */}
              {!isRevealed && (
                <motion.circle
                  cx={point.x} cy={point.y} r="4"
                  fill="rgba(255,255,255,0.08)"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Auto-scaling badge */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            className="absolute top-6 right-6 rounded-full border px-4 py-1.5 text-xs font-mono"
            initial={{ opacity: 0, scale: 0, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              borderColor: 'var(--accent-amber)',
              color: 'var(--accent-amber)',
              background: 'rgba(245,158,11,0.08)',
              boxShadow: '0 0 16px rgba(245,158,11,0.25)',
            }}
          >
            Auto-scaling in 30&ndash;60 seconds
          </motion.div>
        )}
      </AnimatePresence>

      {/* Narration */}
      <Narration text={narrations.scene6} delay={0.5} />
    </motion.div>
  );
}
