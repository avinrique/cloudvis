import { lazy, ComponentType } from 'react';

export interface SceneConfig {
  id: string;
  act: number;
  title: string;
  component: React.LazyExoticComponent<ComponentType>;
  accentColor: string;
  interactive?: boolean;
}

export const scenes: SceneConfig[] = [
  // Act 0: Opening
  {
    id: 'opening',
    act: 0,
    title: 'The Hook',
    component: lazy(() => import('@/components/scenes/Opening')),
    accentColor: 'var(--accent-gold)',
  },
  // Act 1: Understanding Cloud
  {
    id: 'what-is-cloud',
    act: 1,
    title: 'What Is Cloud Computing',
    component: lazy(() => import('@/components/scenes/Act1/WhatIsCloud')),
    accentColor: 'var(--accent-blue)',
  },
  {
    id: 'evolution',
    act: 1,
    title: 'The Evolution',
    component: lazy(() => import('@/components/scenes/Act1/Evolution')),
    accentColor: 'var(--accent-purple)',
    interactive: true,
  },
  {
    id: 'traditional-vs-cloud',
    act: 1,
    title: 'Traditional vs Cloud',
    component: lazy(() => import('@/components/scenes/Act1/TraditionalVsCloud')),
    accentColor: 'var(--accent-red)',
  },
  // Act 2: Architecture
  {
    id: 'architecture-layers',
    act: 2,
    title: 'Architecture Layers',
    component: lazy(() => import('@/components/scenes/Act2/ArchitectureLayers')),
    accentColor: 'var(--accent-cyan)',
    interactive: true,
  },
  {
    id: 'nist-characteristics',
    act: 2,
    title: 'NIST 5 Characteristics',
    component: lazy(() => import('@/components/scenes/Act2/NISTCharacteristics')),
    accentColor: 'var(--accent-purple)',
    interactive: true,
  },
  // Act 3: Models
  {
    id: 'deployment-models',
    act: 3,
    title: 'Deployment Models',
    component: lazy(() => import('@/components/scenes/Act3/DeploymentModels')),
    accentColor: 'var(--accent-amber)',
    interactive: true,
  },
  {
    id: 'service-models',
    act: 3,
    title: 'Service Models',
    component: lazy(() => import('@/components/scenes/Act3/ServiceModels')),
    accentColor: 'var(--accent-blue)',
    interactive: true,
  },
  // Act 4: Real World
  {
    id: 'pros-and-cons',
    act: 4,
    title: 'Pros & Cons',
    component: lazy(() => import('@/components/scenes/Act4/ProsAndCons')),
    accentColor: 'var(--accent-green)',
  },
  {
    id: 'cloud-platforms',
    act: 4,
    title: 'Cloud Platforms',
    component: lazy(() => import('@/components/scenes/Act4/CloudPlatforms')),
    accentColor: 'var(--accent-orange)',
  },
  {
    id: 'hands-on-deploy',
    act: 4,
    title: 'Hands-On Deploy',
    component: lazy(() => import('@/components/scenes/Act4/HandsOnDeploy')),
    accentColor: 'var(--accent-green)',
  },
  // Act 5: Closing
  {
    id: 'closing',
    act: 5,
    title: 'The Big Picture',
    component: lazy(() => import('@/components/scenes/Closing')),
    accentColor: 'var(--accent-gold)',
  },
];

export const actNames: Record<number, string> = {
  0: 'Opening',
  1: 'Act 1: Understanding',
  2: 'Act 2: Architecture',
  3: 'Act 3: Models',
  4: 'Act 4: Real World',
  5: 'Closing',
};
