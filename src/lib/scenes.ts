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
    title: 'Session 2: Deep Dive',
    component: lazy(() => import('@/components/scenes/Opening')),
    accentColor: 'var(--accent-gold)',
  },
  // Act 1: Service Models Deep Dive
  {
    id: 'service-spectrum',
    act: 1,
    title: 'The Service Spectrum',
    component: lazy(() => import('@/components/scenes/Session2/ServiceSpectrum')),
    accentColor: 'var(--accent-blue)',
    interactive: true,
  },
  {
    id: 'iaas-deep-dive',
    act: 1,
    title: 'IaaS Deep Dive',
    component: lazy(() => import('@/components/scenes/Session2/IaaSDeepDive')),
    accentColor: 'var(--accent-blue)',
    interactive: true,
  },
  {
    id: 'paas-deep-dive',
    act: 1,
    title: 'PaaS Deep Dive',
    component: lazy(() => import('@/components/scenes/Session2/PaaSDeepDive')),
    accentColor: 'var(--accent-purple)',
    interactive: true,
  },
  {
    id: 'saas-deep-dive',
    act: 1,
    title: 'SaaS Deep Dive',
    component: lazy(() => import('@/components/scenes/Session2/SaaSDeepDive')),
    accentColor: 'var(--accent-cyan)',
    interactive: true,
  },
  // Act 2: Comparison & Decision
  {
    id: 'service-comparison',
    act: 2,
    title: 'IaaS vs PaaS vs SaaS',
    component: lazy(() => import('@/components/scenes/Session2/ServiceComparison')),
    accentColor: 'var(--accent-amber)',
    interactive: true,
  },
  // Act 3: Infrastructure Concepts
  {
    id: 'virtualization-containers',
    act: 3,
    title: 'VMs & Containers',
    component: lazy(() => import('@/components/scenes/Session2/VirtualizationContainers')),
    accentColor: 'var(--accent-purple)',
    interactive: true,
  },
  {
    id: 'cloud-storage',
    act: 3,
    title: 'Cloud Storage Types',
    component: lazy(() => import('@/components/scenes/Session2/CloudStorage')),
    accentColor: 'var(--accent-blue)',
    interactive: true,
  },
  {
    id: 'auto-scaling',
    act: 3,
    title: 'Auto-Scaling & Load Balancing',
    component: lazy(() => import('@/components/scenes/Session2/AutoScaling')),
    accentColor: 'var(--accent-green)',
    interactive: true,
  },
  // Act 4: Modern Cloud
  {
    id: 'serverless',
    act: 4,
    title: 'Serverless / FaaS',
    component: lazy(() => import('@/components/scenes/Session2/Serverless')),
    accentColor: 'var(--accent-orange)',
    interactive: true,
  },
  {
    id: 'real-world-architecture',
    act: 4,
    title: 'Real-World Architecture',
    component: lazy(() => import('@/components/scenes/Session2/RealWorldArch')),
    accentColor: 'var(--accent-cyan)',
    interactive: true,
  },
  // Act 5: Closing
  {
    id: 'closing',
    act: 5,
    title: 'Keep Exploring',
    component: lazy(() => import('@/components/scenes/Closing')),
    accentColor: 'var(--accent-gold)',
  },
];

export const actNames: Record<number, string> = {
  0: 'Opening',
  1: 'Act 1: Service Models',
  2: 'Act 2: Choosing Right',
  3: 'Act 3: Infrastructure',
  4: 'Act 4: Modern Cloud',
  5: 'Closing',
};
