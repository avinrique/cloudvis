import { Variants } from 'framer-motion';

// Cinematic ease curves
const smoothOut = [0.22, 1, 0.36, 1] as const;
const smoothIn = [0.55, 0, 1, 0.45] as const;
const dramatic = [0.16, 1, 0.3, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: smoothOut },
  },
  exit: { opacity: 0, y: -20, filter: 'blur(4px)', transition: { duration: 0.4, ease: smoothIn } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(6px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: smoothOut } },
  exit: { opacity: 0, filter: 'blur(4px)', transition: { duration: 0.3 } },
};

export const springBounce: Variants = {
  hidden: { opacity: 0, scale: 0.3, y: -100 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

export const glowPulse: Variants = {
  idle: {
    boxShadow: '0 0 10px rgba(255,215,0,0.2)',
  },
  active: {
    boxShadow: [
      '0 0 10px rgba(255,215,0,0.2)',
      '0 0 30px rgba(255,215,0,0.5)',
      '0 0 10px rgba(255,215,0,0.2)',
    ],
    transition: { duration: 2, repeat: Infinity },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: dramatic } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80, filter: 'blur(6px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: dramatic } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  },
};

export const sceneTransition = {
  initial: { opacity: 0, scale: 1.05, filter: 'blur(10px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: smoothOut } },
  exit: { opacity: 0, scale: 0.95, filter: 'blur(8px)', transition: { duration: 0.4 } },
};

// New cinematic variants
export const cinematicReveal: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: dramatic },
  },
};

export const floatIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: smoothOut },
  }),
};

export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: dramatic },
  },
};
