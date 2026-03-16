'use client';
import { motion } from 'framer-motion';

interface Slice {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  slices: Slice[];
  size?: number;
  animate?: boolean;
  className?: string;
}

export default function PieChart({ slices, size = 180, animate = true, className = '' }: PieChartProps) {
  const total = slices.reduce((sum, s) => sum + s.value, 0);
  const radius = size / 2 - 10;
  const cx = size / 2;
  const cy = size / 2;

  let cumulativeAngle = -90;

  const paths = slices.map((slice, i) => {
    const angle = (slice.value / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle = endAngle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    // Label position
    const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
    const labelRadius = radius * 0.65;
    const lx = cx + labelRadius * Math.cos(midAngle);
    const ly = cy + labelRadius * Math.sin(midAngle);

    return { d, color: slice.color, label: slice.label, value: slice.value, lx, ly, i };
  });

  return (
    <div className={`relative ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {paths.map(p => (
          <motion.path
            key={p.i}
            d={p.d}
            fill={p.color}
            stroke="var(--bg-void)"
            strokeWidth="2"
            initial={animate ? { opacity: 0, scale: 0.8 } : undefined}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: p.i * 0.2, duration: 0.5 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}
        {paths.map(p => (
          <motion.text
            key={`label-${p.i}`}
            x={p.lx}
            y={p.ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="10"
            fontFamily="var(--font-space-mono)"
            initial={animate ? { opacity: 0 } : undefined}
            animate={{ opacity: 1 }}
            transition={{ delay: p.i * 0.2 + 0.3 }}
          >
            {p.value}%
          </motion.text>
        ))}
      </svg>
      <div className="flex flex-wrap gap-3 mt-3 justify-center">
        {slices.map((s, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-1.5 text-xs font-code"
            initial={animate ? { opacity: 0, y: 10 } : undefined}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 + 0.5 }}
          >
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
            <span className="text-dim">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
