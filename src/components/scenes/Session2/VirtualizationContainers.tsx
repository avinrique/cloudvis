'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSceneProgress } from '@/components/hooks/useSceneProgress';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/lib/animations';
import { narrations, vmVsContainer, stats } from '@/lib/content';
import Narration from '@/components/shared/Narration';
import InteractiveIndicator from '@/components/shared/InteractiveIndicator';

const VM_COLOR = '#A855F7';
const CONTAINER_COLOR = '#22C55E';

function VMDiagram() {
  return (
    <motion.div className="flex flex-col items-center" variants={slideInLeft} initial="hidden" animate="visible">
      <h3 className="text-lg font-display font-bold mb-3" style={{ color: VM_COLOR }}>
        Virtual Machines
      </h3>
      <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
        {/* Host OS base */}
        <motion.rect
          x="10" y="120" width="180" height="30" rx="4"
          stroke={VM_COLOR} strokeWidth="1.5" fill={`${VM_COLOR}10`}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
        <text x="100" y="139" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" opacity="0.6">
          Hypervisor
        </text>
        {/* VMs */}
        {[0, 1, 2].map((i) => (
          <motion.g key={i}>
            <motion.rect
              x={15 + i * 62} y="15" width="55" height="95" rx="4"
              stroke={VM_COLOR} strokeWidth="1" fill={`${VM_COLOR}15`}
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 15, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.2, type: 'spring', stiffness: 180, damping: 15 }}
            />
            {/* Guest OS */}
            <motion.rect
              x={20 + i * 62} y="75" width="45" height="15" rx="2"
              fill={`${VM_COLOR}25`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.15 }}
            />
            <motion.text
              x={42 + i * 62} y="86" textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1 + i * 0.15 }}
            >
              Guest OS
            </motion.text>
            {/* App */}
            <motion.rect
              x={25 + i * 62} y="30" width="35" height="35" rx="3"
              fill={`${VM_COLOR}30`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.15 }}
            />
            <motion.text
              x={42 + i * 62} y="51" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.3 + i * 0.15 }}
            >
              App
            </motion.text>
          </motion.g>
        ))}
      </svg>
      <motion.span
        className="text-[10px] text-white/40 font-body italic mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        &ldquo;{vmVsContainer.vm.analogy}&rdquo;
      </motion.span>
    </motion.div>
  );
}

function ContainerDiagram() {
  return (
    <motion.div className="flex flex-col items-center" variants={slideInRight} initial="hidden" animate="visible">
      <h3 className="text-lg font-display font-bold mb-3" style={{ color: CONTAINER_COLOR }}>
        Containers
      </h3>
      <svg width="200" height="160" viewBox="0 0 200 160" fill="none">
        {/* Shared OS */}
        <motion.rect
          x="10" y="100" width="180" height="50" rx="4"
          stroke={CONTAINER_COLOR} strokeWidth="1.5" fill={`${CONTAINER_COLOR}10`}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />
        <text x="100" y="122" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" opacity="0.6">
          Container Runtime
        </text>
        <text x="100" y="138" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" opacity="0.4">
          Shared OS Kernel
        </text>
        {/* Containers */}
        {[0, 1, 2, 3].map((i) => (
          <motion.g key={i}>
            <motion.rect
              x={12 + i * 46} y="25" width="40" height="65" rx="4"
              stroke={CONTAINER_COLOR} strokeWidth="1" fill={`${CONTAINER_COLOR}15`}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 25, opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.12, type: 'spring', stiffness: 200, damping: 15 }}
            />
            <motion.rect
              x={17 + i * 46} y="40" width="30" height="30" rx="3"
              fill={`${CONTAINER_COLOR}30`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
            />
            <motion.text
              x={32 + i * 46} y="59" textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 1.1 + i * 0.1 }}
            >
              App
            </motion.text>
          </motion.g>
        ))}
      </svg>
      <motion.span
        className="text-[10px] text-white/40 font-body italic mt-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        &ldquo;{vmVsContainer.container.analogy}&rdquo;
      </motion.span>
    </motion.div>
  );
}

function ComparisonStats() {
  const rows = [
    { label: 'Startup', vm: vmVsContainer.vm.startup, container: vmVsContainer.container.startup },
    { label: 'Size', vm: vmVsContainer.vm.size, container: vmVsContainer.container.size },
    { label: 'Isolation', vm: vmVsContainer.vm.isolation, container: vmVsContainer.container.isolation },
    { label: 'Density', vm: vmVsContainer.vm.density, container: vmVsContainer.container.density },
  ];

  return (
    <motion.div
      className="w-full max-w-xl mt-4 rounded-xl border border-white/10 overflow-hidden"
      style={{ background: 'rgba(17,22,51,0.7)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-2 px-3 text-left text-[10px] text-white/30 font-body" />
            <th className="py-2 px-3 text-center text-xs font-display" style={{ color: VM_COLOR }}>VM</th>
            <th className="py-2 px-3 text-center text-xs font-display" style={{ color: CONTAINER_COLOR }}>Container</th>
          </tr>
        </thead>
        <motion.tbody variants={staggerContainer} initial="hidden" animate="visible">
          {rows.map((row) => (
            <motion.tr key={row.label} variants={fadeInUp} className="border-b border-white/5">
              <td className="py-2 px-3 text-xs text-white/60 font-body">{row.label}</td>
              <td className="py-2 px-3 text-xs text-center font-code" style={{ color: VM_COLOR }}>{row.vm}</td>
              <td className="py-2 px-3 text-xs text-center font-code" style={{ color: CONTAINER_COLOR }}>{row.container}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </motion.div>
  );
}

export default function VirtualizationContainers() {
  const { phase } = useSceneProgress({ totalPhases: 3 });

  return (
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center px-6 py-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-display font-bold text-white mb-1"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        VMs & Containers
      </motion.h2>
      <motion.p
        className="text-sm text-white/40 font-body mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Two ways to package and run applications
      </motion.p>

      {/* Phase 0+: Side-by-side diagrams */}
      <div className="flex gap-8 w-full max-w-3xl justify-center">
        {phase >= 0 && <VMDiagram />}
        {phase >= 0 && <ContainerDiagram />}
      </div>

      {/* Phase 1: Stats comparison */}
      <AnimatePresence>
        {phase >= 1 && <ComparisonStats />}
      </AnimatePresence>

      {/* Phase 2: Container startup highlight */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            className="mt-4 flex items-center gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="px-4 py-2 rounded-lg" style={{ background: `${CONTAINER_COLOR}15`, border: `1px solid ${CONTAINER_COLOR}30` }}>
              <span className="text-xl font-display font-bold" style={{ color: CONTAINER_COLOR }}>
                {stats.containerStartup}
              </span>
              <span className="text-xs text-white/40 font-body ml-2">container startup</span>
            </div>
            <span className="text-white/20">vs</span>
            <div className="px-4 py-2 rounded-lg" style={{ background: `${VM_COLOR}15`, border: `1px solid ${VM_COLOR}30` }}>
              <span className="text-xl font-display font-bold" style={{ color: VM_COLOR }}>
                {vmVsContainer.vm.startup}
              </span>
              <span className="text-xs text-white/40 font-body ml-2">VM startup</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {phase < 2 && <InteractiveIndicator className="mt-6" />}
      <Narration text={narrations.scene7} delay={0.4} />
    </motion.div>
  );
}
