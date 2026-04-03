'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';

interface UseSceneProgressOptions {
  totalPhases: number;
  /** ms per phase for auto-advance. Pass an array for per-phase timing. */
  autoAdvance?: number | number[];
  onComplete?: () => void;
}

export function useSceneProgress({ totalPhases, autoAdvance, onComplete }: UseSceneProgressOptions) {
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const setSceneStepHandler = useAppStore(s => s.setSceneStepHandler);
  const setSceneStepBackHandler = useAppStore(s => s.setSceneStepBackHandler);
  const isPaused = useAppStore(s => s.isPaused);
  const speed = useAppStore(s => s.animationSpeed);

  const handleStep = useCallback(() => {
    if (phaseRef.current < totalPhases - 1) {
      setPhase(prev => prev + 1);
      return true;
    }
    if (phaseRef.current === totalPhases - 1 && onComplete) {
      onComplete();
    }
    return false;
  }, [totalPhases, onComplete]);

  const handleStepBack = useCallback(() => {
    if (phaseRef.current > 0) {
      setPhase(prev => prev - 1);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    setSceneStepHandler(handleStep);
    setSceneStepBackHandler(handleStepBack);
    return () => {
      setSceneStepHandler(null);
      setSceneStepBackHandler(null);
    };
  }, [setSceneStepHandler, setSceneStepBackHandler, handleStep, handleStepBack]);

  // Auto-advance through phases
  useEffect(() => {
    if (!autoAdvance || isPaused) return;
    if (phase >= totalPhases - 1) return;

    const delay = Array.isArray(autoAdvance) ? (autoAdvance[phase] ?? autoAdvance[autoAdvance.length - 1]) : autoAdvance;
    const scaledDelay = delay / speed;

    const timer = setTimeout(() => {
      setPhase(prev => Math.min(prev + 1, totalPhases - 1));
    }, scaledDelay);

    return () => clearTimeout(timer);
  }, [phase, autoAdvance, isPaused, speed, totalPhases]);

  return { phase, setPhase, isFirst: phase === 0, isLast: phase === totalPhases - 1 };
}
