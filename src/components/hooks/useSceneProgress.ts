'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { useAppStore } from '@/lib/store';

interface UseSceneProgressOptions {
  totalPhases: number;
  onComplete?: () => void;
}

export function useSceneProgress({ totalPhases, onComplete }: UseSceneProgressOptions) {
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  const setSceneStepHandler = useAppStore(s => s.setSceneStepHandler);
  const setSceneStepBackHandler = useAppStore(s => s.setSceneStepBackHandler);

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

  return { phase, setPhase, isFirst: phase === 0, isLast: phase === totalPhases - 1 };
}
