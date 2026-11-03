'use client';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 50, className = '', as = 'div' }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </M>
  );
}

// Splits a heading into words that slide up from a mask.
export function SplitReveal({ text, className = '', delay = 0, as = 'h2' }) {
  const M = motion[as];
  const words = text.split(' ');
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span className="mask" key={i}>
          <motion.span
            className={w.startsWith('*') ? 'serif-accent' : undefined}
            variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 1, ease } } }}
          >
            {w.replace(/^\*/, '')}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </M>
  );
}

export function Eyebrow({ children }) {
  return (
    <Reveal className="eyebrow" y={20}>
      <span className="eyebrow-dot" /> {children}
    </Reveal>
  );
}
