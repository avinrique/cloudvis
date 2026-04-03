'use client';
import { useEffect, useRef, Suspense, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { scenes } from '@/lib/scenes';
import { useAppStore } from '@/lib/store';
import NavigationHUD from './NavigationHUD';
import SpeedControl from './SpeedControl';
import ErrorBoundary from './shared/ErrorBoundary';
import CinematicBackground from './shared/CinematicBackground';

const sceneVariants = {
  initial: {
    opacity: 0,
    scale: 1.08,
    filter: 'blur(12px) brightness(0.6)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px) brightness(1)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
      filter: { duration: 0.6 },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    filter: 'blur(8px) brightness(0.5)',
    transition: {
      duration: 0.5,
      ease: [0.55, 0, 1, 0.45] as const,
    },
  },
};

export default function SceneManager() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSceneIndex = useAppStore(s => s.currentSceneIndex);
  const nextScene = useAppStore(s => s.nextScene);
  const prevScene = useAppStore(s => s.prevScene);
  const goToScene = useAppStore(s => s.goToScene);
  const totalScenes = scenes.length;

  useEffect(() => {
    useAppStore.setState({ totalScenes: scenes.length });
    containerRef.current?.focus();
  }, []);

  const togglePause = useAppStore(s => s.togglePause);

  const handleKeyDown = useCallback((e: React.KeyboardEvent | KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    switch (e.key) {
      case ' ':
        e.preventDefault();
        togglePause();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextScene();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        prevScene();
        break;
      default:
        if (e.key >= '1' && e.key <= '9') {
          e.preventDefault();
          goToScene(parseInt(e.key) - 1);
        } else if (e.key === '0') {
          e.preventDefault();
          goToScene(9);
        }
        break;
    }
  }, [nextScene, prevScene, togglePause, goToScene]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => handleKeyDown(e);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleKeyDown]);

  // Touch/swipe
  useEffect(() => {
    let touchStartY = 0;
    let touchStartX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      const deltaX = touchStartX - e.changedTouches[0].clientX;
      const absDeltaY = Math.abs(deltaY);
      const absDeltaX = Math.abs(deltaX);

      if (Math.max(absDeltaX, absDeltaY) < 50) return;

      if (absDeltaY > absDeltaX) {
        if (deltaY > 0) nextScene();
        else prevScene();
      } else {
        if (deltaX > 0) nextScene();
        else prevScene();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextScene, prevScene]);

  const currentScene = scenes[currentSceneIndex];
  const SceneComponent = currentScene.component;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-screen h-screen overflow-hidden bg-void outline-none"
    >
      {/* Persistent cinematic background */}
      <CinematicBackground />

      <NavigationHUD />
      <SpeedControl />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene.id}
          variants={sceneVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 z-10"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          <ErrorBoundary>
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    className="w-3 h-5 bg-accent-blue rounded-sm"
                    animate={{ opacity: [1, 0.2, 1], scaleY: [1, 0.8, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>
              }
            >
              <SceneComponent />
            </Suspense>
          </ErrorBoundary>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); prevScene(); }}
          disabled={currentSceneIndex === 0}
          className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/15 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-primary transition-all border border-white/10 hover:border-white/20"
          title="Previous (arrow left/up)"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="text-xs text-dim font-code tabular-nums px-2 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
          {currentSceneIndex + 1}/{totalScenes}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); nextScene(); }}
          disabled={currentSceneIndex === totalScenes - 1}
          className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/15 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-primary transition-all border border-white/10 hover:border-white/20"
          title="Next (arrow right/down)"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
