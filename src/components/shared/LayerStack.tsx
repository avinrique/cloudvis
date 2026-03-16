'use client';
import { motion } from 'framer-motion';

interface Layer {
  name: string;
  description?: string;
  color: string;
}

interface LayerStackProps {
  layers: Layer[];
  revealedCount: number;
  className?: string;
}

export default function LayerStack({ layers, revealedCount, className = '' }: LayerStackProps) {
  return (
    <div className={`flex flex-col-reverse gap-2 ${className}`}>
      {layers.map((layer, i) => {
        const isRevealed = i < revealedCount;
        const colorVar = `var(--accent-${layer.color})`;
        const glowVar = `var(--glow-${layer.color})`;

        return (
          <motion.div
            key={layer.name}
            className="relative rounded-lg border px-4 py-3 flex items-center gap-3"
            initial={{ opacity: 0, x: -40, scaleX: 0.8 }}
            animate={isRevealed ? {
              opacity: 1,
              x: 0,
              scaleX: 1,
            } : {
              opacity: 0.15,
              x: -40,
              scaleX: 0.8,
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              borderColor: isRevealed ? colorVar : 'rgba(255,255,255,0.05)',
              background: isRevealed
                ? 'rgba(17,22,51,0.8)'
                : 'rgba(17,22,51,0.3)',
              boxShadow: isRevealed ? `0 0 20px ${glowVar}` : 'none',
            }}
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: isRevealed ? colorVar : 'rgba(255,255,255,0.1)' }}
            />
            <div className="flex-1 min-w-0">
              <div
                className="text-sm font-display tracking-wider"
                style={{ color: isRevealed ? colorVar : 'var(--text-dim)' }}
              >
                {layer.name}
              </div>
              {layer.description && isRevealed && (
                <motion.div
                  className="text-xs text-dim mt-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {layer.description}
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
