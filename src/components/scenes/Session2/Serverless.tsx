'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, staggerContainer, cinematicReveal } from '@/lib/animations';
import { narrations, serverlessFeatures, serverlessProviders, stats } from '@/lib/content';
import Narration from '@/components/shared/Narration';
import GlowBox from '@/components/shared/GlowBox';
import Terminal from '@/components/shared/Terminal';

const ACCENT = '#FF6B35';

function FeatureIcon({ icon }: { icon: string }) {
  const icons: Record<string, JSX.Element> = {
    noserver: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="7" rx="1.5" />
        <rect x="2" y="14" width="20" height="7" rx="1.5" />
        <line x1="3" y1="1" x2="21" y2="23" strokeWidth="2" />
      </svg>
    ),
    pay: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    scale: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    event: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  };
  return icons[icon] || null;
}

function EventFlowDiagram() {
  const events = [
    { label: 'HTTP Request', icon: '↗', sub: 'Trigger' },
    { label: 'Function', icon: 'ƒ', sub: 'Execute' },
    { label: 'Response', icon: '↙', sub: 'Return' },
  ];

  return (
    <motion.div className="flex items-center gap-3">
      {events.map((e, i) => (
        <motion.div key={e.label} className="flex items-center gap-3">
          <motion.div
            className="w-20 h-20 rounded-xl flex flex-col items-center justify-center relative overflow-hidden"
            style={{
              background: i === 1 ? `${ACCENT}15` : 'rgba(17,22,51,0.6)',
              border: `1.5px solid ${i === 1 ? ACCENT : 'rgba(255,255,255,0.08)'}`,
            }}
            initial={{ scale: 0, rotateY: -90, filter: 'blur(8px)' }}
            animate={{ scale: 1, rotateY: 0, filter: 'blur(0px)' }}
            transition={{ delay: i * 0.25, type: 'spring', stiffness: 180, damping: 15 }}
          >
            {i === 1 && (
              <motion.div className="absolute inset-0 rounded-xl"
                animate={{ boxShadow: [`inset 0 0 20px ${ACCENT}10`, `inset 0 0 30px ${ACCENT}25`, `inset 0 0 20px ${ACCENT}10`] }}
                transition={{ duration: 2, repeat: Infinity }} />
            )}
            <motion.span className="text-2xl relative z-10"
              style={{ color: i === 1 ? ACCENT : 'rgba(255,255,255,0.4)' }}
              animate={i === 1 ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}>
              {e.icon}
            </motion.span>
            <span className="text-[8px] font-body mt-1 relative z-10"
              style={{ color: i === 1 ? ACCENT : 'rgba(255,255,255,0.3)' }}>
              {e.sub}
            </span>
          </motion.div>
          {i < events.length - 1 && (
            <motion.div className="relative">
              <motion.div className="w-8 h-px"
                style={{ background: `${ACCENT}40` }}
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 + i * 0.25, duration: 0.4 }} />
              {/* Animated dot traveling along the line */}
              <motion.div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
                animate={{ left: ['-10%', '110%'] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 1 + i * 0.3, repeatDelay: 0.5 }} />
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function Serverless() {
  const { phase } = useSceneProgress({ totalPhases: 4, autoAdvance: [3000, 3000, 3000, 4000] });

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
        variants={cinematicReveal}
        initial="hidden"
        animate="visible"
      >
        Serverless / FaaS
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Write functions, not servers
      </motion.p>

      {phase === 0 && <EventFlowDiagram />}

      <AnimatePresence>
        {phase >= 1 && phase < 3 && (
          <motion.div
            className="grid grid-cols-2 gap-4 w-full max-w-2xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, filter: 'blur(6px)' }}
          >
            {serverlessFeatures.map((f, i) => (
              <motion.div key={f.name} variants={fadeInUp}>
                <GlowBox color={ACCENT} intensity={0.15} pulse className="h-full">
                  <div className="flex items-start gap-3">
                    <motion.div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${ACCENT}15` }}
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}>
                      <FeatureIcon icon={f.icon} />
                    </motion.div>
                    <div>
                      <h4 className="text-sm font-display font-bold text-white mb-0.5">{f.name}</h4>
                      <p className="text-xs text-white/50 font-body">{f.description}</p>
                    </div>
                  </div>
                </GlowBox>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 2 && phase < 3 && (
          <motion.div className="mt-4"
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <Terminal title="lambda.js" showCursor={false} width="w-full max-w-md">
              <div className="text-xs">
                <span className="text-purple-400">export</span>{' '}
                <span className="text-blue-400">async function</span>{' '}
                <span className="text-amber-300">handler</span>
                <span className="text-white/50">(event) {'{'}</span>
                <br />
                <span className="text-white/30">{'  '}</span>
                <span className="text-purple-400">return</span>{' '}
                <span className="text-white/50">{'{ '}</span>
                <span className="text-green-400">status</span>
                <span className="text-white/50">: </span>
                <span className="text-amber-300">200</span>
                <span className="text-white/50">{' }'}</span>
                <br />
                <span className="text-white/50">{'}'}</span>
              </div>
            </Terminal>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase >= 3 && (
          <motion.div className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, filter: 'blur(6px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}>
            <div className="flex gap-3">
              {serverlessProviders.map((p, i) => (
                <motion.div key={p.name}
                  className="px-3 py-2 rounded-lg text-xs font-body relative overflow-hidden"
                  style={{ border: `1px solid ${p.color}30`, background: `${p.color}08`, color: p.color }}
                  initial={{ scale: 0, rotateY: -60 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 250, damping: 18 }}>
                  <motion.div className="absolute inset-0"
                    style={{ background: `linear-gradient(90deg, transparent, ${p.color}10, transparent)` }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'linear' }} />
                  <span className="relative z-10">{p.name}</span>
                </motion.div>
              ))}
            </div>
            <motion.div className="px-5 py-3 rounded-lg border border-orange-500/20 relative overflow-hidden"
              style={{ background: `${ACCENT}08` }}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}>
              <motion.span className="text-xl font-display font-bold" style={{ color: ACCENT }}
                animate={{ textShadow: [`0 0 10px ${ACCENT}40`, `0 0 25px ${ACCENT}60`, `0 0 10px ${ACCENT}40`] }}
                transition={{ duration: 2, repeat: Infinity }}>
                {stats.serverlessExecs}
              </motion.span>
              <span className="text-xs text-white/40 font-body ml-2">free executions on AWS Lambda</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Narration text={narrations.scene10} delay={0.4} />
    </motion.div>
  );
}
