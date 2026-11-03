'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '@/lib/site';
import { Eyebrow } from './Reveal';

export default function Testimonials() {
  const list = site.testimonials;
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % list.length), 6000);
    return () => clearInterval(id);
  }, [i, list.length]);

  const t = list[i];
  return (
    <section className="section testimonials">
      <div className="container">
        <Eyebrow>Kind words</Eyebrow>
        <div className="quote-wrap">
          <span className="quote-mark">&ldquo;</span>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p>{t.quote}</p>
              <footer>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="quote-dots">
            {list.map((_, n) => (
              <button key={n} className={n === i ? 'is-active' : ''} onClick={() => setI(n)} aria-label={`Testimonial ${n + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
