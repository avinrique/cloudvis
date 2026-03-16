'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface IconBadgeProps {
  icon: ReactNode;
  label: string;
  color?: string;
  className?: string;
}

export default function IconBadge({ icon, label, color = 'var(--accent-gold)', className = '' }: IconBadgeProps) {
  return (
    <motion.div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${className}`}
      style={{
        borderColor: color,
        color,
        background: 'rgba(17,22,51,0.8)',
      }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-sm">{icon}</span>
      <span className="text-xs font-display tracking-wider">{label}</span>
    </motion.div>
  );
}
