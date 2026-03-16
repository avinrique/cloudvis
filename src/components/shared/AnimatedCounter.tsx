'use client';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2,
  delay = 0,
  className = '',
}: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const controls = animate(count, value, { duration });
      return () => controls.stop();
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [value, duration, delay, count]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${v}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, prefix, suffix]);

  return (
    <motion.span
      ref={displayRef}
      className={`font-display tabular-nums ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
}
