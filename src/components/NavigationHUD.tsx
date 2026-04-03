'use client';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { scenes, actNames } from '@/lib/scenes';

export default function NavigationHUD() {
  const currentSceneIndex = useAppStore(s => s.currentSceneIndex);
  const goToScene = useAppStore(s => s.goToScene);
  const totalScenes = scenes.length;

  const progress = totalScenes > 0 ? ((currentSceneIndex + 1) / totalScenes) * 100 : 0;
  const currentScene = scenes[currentSceneIndex];

  const acts = Array.from(new Set(scenes.map(s => s.act)));
  const actFirstIndex = acts.map(act => scenes.findIndex(s => s.act === act));

  return (
    <>
      {/* Progress bar with glow */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-transparent z-50">
        <motion.div
          className="h-full relative"
          style={{
            background: 'linear-gradient(90deg, #3B82F6, #A855F7, #06B6D4, #FFD700)',
          }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow tip */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.6), transparent)',
              filter: 'blur(3px)',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Scene title */}
      <motion.div
        key={currentScene?.id}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-xs font-display text-dim tracking-widest uppercase px-3 py-1 rounded-full bg-white/[0.03] backdrop-blur-sm border border-white/5">
          {currentScene?.title}
        </span>
      </motion.div>

      {/* Act pills - vertical dots on left */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2">
        {acts.map((act, i) => {
          const isActive = currentScene?.act === act;
          return (
            <motion.button
              key={act}
              onClick={() => goToScene(actFirstIndex[i])}
              className={`group flex items-center gap-2 text-[10px] px-2 py-1 rounded font-display tracking-wider transition-all ${
                isActive
                  ? 'bg-white/10 text-primary backdrop-blur-sm'
                  : 'text-dim hover:text-primary hover:bg-white/5'
              }`}
              whileHover={{ x: 4 }}
              animate={isActive ? {
                boxShadow: ['0 0 0 0 rgba(255,255,255,0)', '0 0 8px 0 rgba(255,255,255,0.1)', '0 0 0 0 rgba(255,255,255,0)'],
              } : {}}
              transition={isActive ? { duration: 2, repeat: Infinity } : {}}
              title={actNames[act]}
            >
              {act === 0 ? '›' : act === 5 ? '◆' : `A${act}`}
              <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 transition-all duration-300 text-[9px] text-dim">
                {actNames[act]}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Scene dots along right side */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5">
        {scenes.map((scene, i) => (
          <motion.button
            key={scene.id}
            onClick={() => goToScene(i)}
            className="group relative"
            title={scene.title}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{
                background: i === currentSceneIndex
                  ? scene.accentColor.replace('var(--accent-', '').replace(')', '') === 'gold' ? '#FFD700' : 'white'
                  : 'rgba(255,255,255,0.15)',
                boxShadow: i === currentSceneIndex ? '0 0 6px rgba(255,255,255,0.4)' : 'none',
              }}
              animate={i === currentSceneIndex ? { scale: [1, 1.5, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        ))}
      </div>
    </>
  );
}
