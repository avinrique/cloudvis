import { create } from 'zustand';

let lastNavTime = 0;
const NAV_DEBOUNCE_MS = 300;

function canNavigate(): boolean {
  const now = Date.now();
  if (now - lastNavTime < NAV_DEBOUNCE_MS) return false;
  lastNavTime = now;
  return true;
}

function getSavedScene(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const saved = localStorage.getItem('cloudvis-scene');
    return saved ? parseInt(saved, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

function saveScene(index: number): void {
  try {
    localStorage.setItem('cloudvis-scene', String(index));
  } catch {}
}

interface AppState {
  currentSceneIndex: number;
  totalScenes: number;
  isTransitioning: boolean;
  animationSpeed: number;
  isPaused: boolean;
  sceneStepHandler: (() => boolean) | null;
  sceneStepBackHandler: (() => boolean) | null;

  nextScene: () => void;
  prevScene: () => void;
  goToScene: (index: number) => void;
  setTransitioning: (v: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  togglePause: () => void;
  setSceneStepHandler: (handler: (() => boolean) | null) => void;
  setSceneStepBackHandler: (handler: (() => boolean) | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentSceneIndex: getSavedScene(),
  totalScenes: 0,
  isTransitioning: false,
  animationSpeed: 1,
  isPaused: false,
  sceneStepHandler: null,
  sceneStepBackHandler: null,

  nextScene: () => {
    if (!canNavigate()) return;
    const { sceneStepHandler } = get();
    if (sceneStepHandler && sceneStepHandler()) return;
    const { currentSceneIndex, totalScenes } = get();
    if (currentSceneIndex < totalScenes - 1) {
      const next = currentSceneIndex + 1;
      saveScene(next);
      set({ currentSceneIndex: next, isPaused: false });
    }
  },

  prevScene: () => {
    if (!canNavigate()) return;
    const { sceneStepBackHandler } = get();
    if (sceneStepBackHandler && sceneStepBackHandler()) return;
    const { currentSceneIndex } = get();
    if (currentSceneIndex > 0) {
      const prev = currentSceneIndex - 1;
      saveScene(prev);
      set({ currentSceneIndex: prev, isPaused: false });
    }
  },

  goToScene: (index: number) => {
    const { totalScenes } = get();
    if (index >= 0 && index < totalScenes) {
      saveScene(index);
      set({ currentSceneIndex: index, isPaused: false });
    }
  },

  setTransitioning: (v) => set({ isTransitioning: v }),
  setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
  togglePause: () => set(s => ({ isPaused: !s.isPaused })),
  setSceneStepHandler: (handler) => set({ sceneStepHandler: handler }),
  setSceneStepBackHandler: (handler) => set({ sceneStepBackHandler: handler }),
}));
