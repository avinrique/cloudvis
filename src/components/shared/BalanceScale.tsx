'use client';
import { motion } from 'framer-motion';

interface BalanceScaleProps {
  leftItems: string[];
  rightItems: string[];
  leftColor?: string;
  rightColor?: string;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}

export default function BalanceScale({
  leftItems,
  rightItems,
  leftColor = 'var(--accent-green)',
  rightColor = 'var(--accent-orange)',
  leftLabel = 'Advantages',
  rightLabel = 'Limitations',
  className = '',
}: BalanceScaleProps) {
  const tilt = leftItems.length > rightItems.length ? -3 : rightItems.length > leftItems.length ? 3 : 0;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Scale beam */}
      <motion.div
        className="relative w-full max-w-2xl"
        animate={{ rotate: tilt }}
        transition={{ duration: 1, delay: Math.max(leftItems.length, rightItems.length) * 0.15 + 0.5, type: 'spring' }}
      >
        {/* Beam */}
        <div className="h-1 bg-white/20 rounded-full mx-8" />

        {/* Fulcrum triangle */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-3">
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
            <path d="M10 0L20 12H0Z" fill="var(--text-dim)" />
          </svg>
        </div>

        {/* Left pan */}
        <div className="absolute left-0 top-4 w-[45%] flex flex-col items-center">
          <div className="text-xs font-display tracking-wider mb-2" style={{ color: leftColor }}>{leftLabel}</div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {leftItems.map((item, i) => (
              <motion.div
                key={item}
                className="px-2.5 py-1 rounded-md border text-xs font-body"
                style={{ borderColor: leftColor, color: leftColor, background: 'rgba(17,22,51,0.8)' }}
                initial={{ opacity: 0, y: -30, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right pan */}
        <div className="absolute right-0 top-4 w-[45%] flex flex-col items-center">
          <div className="text-xs font-display tracking-wider mb-2" style={{ color: rightColor }}>{rightLabel}</div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {rightItems.map((item, i) => (
              <motion.div
                key={item}
                className="px-2.5 py-1 rounded-md border text-xs font-body"
                style={{ borderColor: rightColor, color: rightColor, background: 'rgba(17,22,51,0.8)' }}
                initial={{ opacity: 0, y: -30, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: i * 0.15 + 0.3, type: 'spring', stiffness: 200, damping: 15 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
