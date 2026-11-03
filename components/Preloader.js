'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { site } from '@/lib/site';

const ease = [0.76, 0, 0.24, 1];

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let t;
    const ctrl = animate(0, 100, {
      duration: 2.1,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        t = setTimeout(() => {
          setDone(true);
          window.__appLoaded = true;
          window.dispatchEvent(new Event('app:loaded'));
        }, 250);
      },
    });
    return () => {
      ctrl.stop();
      clearTimeout(t);
    };
  }, []);

  const letters = site.name.toUpperCase().split('');

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="preloader" key="pre" exit={{ y: '-100%' }} transition={{ duration: 1.1, ease }}>
          <motion.div className="preloader-curtain" exit={{ y: '-100%' }} transition={{ duration: 1.1, ease, delay: 0.08 }} />
          <div className="preloader-inner">
            <div className="preloader-name">
              {letters.map((l, i) => (
                <span className="mask" key={i}>
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease, delay: 0.1 + i * 0.06 }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </div>
            <motion.div className="preloader-script" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
              designs with love ♡
            </motion.div>
            <motion.p className="preloader-role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              {site.role}
            </motion.p>
          </div>
          <div className="preloader-bar">
            <motion.span style={{ scaleX: count / 100 }} />
          </div>
          <div className="preloader-count">{String(count).padStart(3, '0')}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
