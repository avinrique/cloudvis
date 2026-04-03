'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';
import { narrations, saasExamples } from '@/lib/content';
import Narration from '@/components/shared/Narration';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';

const ACCENT = '#06B6D4';

function SaaSIcon({ icon, color }: { icon: string; color: string }) {
  const icons: Record<string, JSX.Element> = {
    mail: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="22 4 12 13 2 4" />
      </svg>
    ),
    chat: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    crm: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    doc: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    video: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
    folder: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  };
  return icons[icon] || null;
}

function AppCard({ app, index }: { app: (typeof saasExamples)[number]; index: number }) {
  return (
    <motion.div
      className="flex flex-col items-center p-4 rounded-xl border border-white/10"
      style={{
        background: `linear-gradient(135deg, ${app.color}10, rgba(17,22,51,0.7))`,
      }}
      variants={fadeInUp}
    >
      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
        style={{ background: `${app.color}15`, border: `1.5px solid ${app.color}30` }}
        animate={{
          boxShadow: [`0 0 8px ${app.color}20`, `0 0 16px ${app.color}40`, `0 0 8px ${app.color}20`],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      >
        <SaaSIcon icon={app.icon} color={app.color} />
      </motion.div>
      <h4 className="text-sm font-display font-bold text-white">{app.name}</h4>
      <span className="text-[10px] text-white/30 font-body">{app.category}</span>
      <motion.span
        className="text-xs font-code mt-1"
        style={{ color: app.color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {app.users}
      </motion.span>
    </motion.div>
  );
}

export default function SaaSDeepDive() {
  const { phase } = useSceneProgress({ totalPhases: 3 });

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center px-6 py-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-display font-bold mb-1"
        style={{ color: ACCENT }}
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        SaaS Deep Dive
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Software as a Service — just open and use
      </motion.p>

      {/* Phase 0: Browser mockup */}
      {phase === 0 && (
        <motion.div
          className="w-full max-w-md rounded-lg overflow-hidden border border-white/10"
          style={{ background: 'rgba(17,22,51,0.8)' }}
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center gap-2 px-3 py-2 bg-black/30">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            <div className="flex-1 ml-2 h-5 rounded-md bg-white/5 flex items-center px-2">
              <span className="text-[10px] text-white/30 font-code">app.example.com</span>
            </div>
          </div>
          <div className="p-6 flex flex-col items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-full"
              style={{ background: `${ACCENT}30`, border: `2px solid ${ACCENT}` }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-white/60 font-body">No install. No setup. Just log in.</span>
          </div>
        </motion.div>
      )}

      {/* Phase 1: App grid */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div
            className="grid grid-cols-3 gap-4 w-full max-w-2xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {saasExamples.map((app, i) => (
              <AppCard key={app.name} app={app} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Key insight */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="mt-5 px-6 py-3 rounded-lg border border-cyan-500/20"
            style={{ background: `${ACCENT}08` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm text-white/60 font-body text-center">
              <span className="text-cyan-400 font-bold">Key insight:</span> You&apos;re already using SaaS every day —
              email, messaging, docs, video calls. Zero infrastructure to manage.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {phase < 2 && <InteractiveIndicator className="mt-6" />}
      <Narration text={narrations.scene5} delay={0.4} />
    </motion.div>
  );
}
