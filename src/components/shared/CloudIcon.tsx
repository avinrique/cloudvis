'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CloudIconProps {
  size?: number;
  color?: string;
  glow?: boolean;
  children?: ReactNode;
  className?: string;
}

export default function CloudIcon({
  size = 120,
  color = 'var(--accent-blue)',
  glow = true,
  children,
  className = '',
}: CloudIconProps) {
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size * 0.65 }}
    >
      <motion.svg
        viewBox="0 0 120 78"
        width={size}
        height={size * 0.65}
        fill="none"
        animate={glow ? {
          filter: [
            `drop-shadow(0 0 10px ${color})`,
            `drop-shadow(0 0 25px ${color})`,
            `drop-shadow(0 0 10px ${color})`,
          ],
        } : undefined}
        transition={glow ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : undefined}
      >
        <path
          d="M96 68H28C14 68 4 58 4 46c0-10 7-18.5 16.5-21C21 12 32 2 46 2c12 0 22.5 7.5 27 18 2-1 4.5-1.5 7-1.5C93 18.5 104 29 104 42c0 1-.1 2-.2 3C111 47.5 116 54 116 62c0 0-8 6-20 6z"
          stroke={color}
          strokeWidth="2"
          fill="rgba(17,22,51,0.5)"
        />
      </motion.svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </motion.div>
  );
}
