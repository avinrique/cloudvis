'use client';
import { motion } from 'framer-motion';

interface ServerIconProps {
  size?: number;
  color?: string;
  blinkLeds?: boolean;
  className?: string;
}

export default function ServerIcon({
  size = 40,
  color = 'var(--accent-blue)',
  blinkLeds = true,
  className = '',
}: ServerIconProps) {
  return (
    <motion.svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 40 56"
      fill="none"
      className={className}
    >
      {/* Server rack body */}
      <rect x="2" y="2" width="36" height="52" rx="3" stroke={color} strokeWidth="1.5" fill="rgba(17,22,51,0.6)" />
      {/* Slots */}
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x="6" y={8 + i * 16} width="28" height="12" rx="1.5" stroke={color} strokeWidth="1" fill="rgba(17,22,51,0.8)" />
          {/* LED */}
          <motion.circle
            cx="10"
            cy={14 + i * 16}
            r="2"
            fill="var(--accent-green)"
            animate={blinkLeds ? { opacity: [1, 0.3, 1] } : undefined}
            transition={blinkLeds ? { duration: 1.5, repeat: Infinity, delay: i * 0.3 } : undefined}
          />
          {/* Drive lines */}
          <line x1="16" y1={12 + i * 16} x2="30" y2={12 + i * 16} stroke={color} strokeWidth="0.5" opacity="0.3" />
          <line x1="16" y1={15 + i * 16} x2="28" y2={15 + i * 16} stroke={color} strokeWidth="0.5" opacity="0.3" />
        </g>
      ))}
    </motion.svg>
  );
}
