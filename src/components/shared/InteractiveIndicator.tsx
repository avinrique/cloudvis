'use client';
import { motion } from 'framer-motion';

interface InteractiveIndicatorProps {
  className?: string;
}

export default function InteractiveIndicator({ className = '' }: InteractiveIndicatorProps) {
  return (
    <motion.div
      className={`flex items-center gap-2 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="1.5">
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <path d="M12 14v3" />
        <rect x="5" y="11" width="14" height="10" rx="2" />
      </svg>
      <span className="text-xs text-dim font-body">Press arrow keys to advance</span>
    </motion.div>
  );
}
