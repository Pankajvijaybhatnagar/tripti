'use client';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryMap } from '@/lib/site';
import { Media } from './Media';

export default function Lightbox({ items, index, setIndex, onClose }) {
  const item = items[index];
  const cat = categoryMap[item.category];
  const ratio = cat?.ratio || 1;

  const prev = () => setIndex((index - 1 + items.length) % items.length);
  const next = () => setIndex((index + 1) % items.length);

  useEffect(() => {
    window.__lenis?.stop();
    document.body.style.overflow = 'hidden';
    const key = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('keydown', key);
      document.body.style.overflow = '';
      window.__lenis?.start();
    };
  });

  const mediaStyle =
    item.type === 'image' && item.src
      ? undefined
      : { width: `min(100%, calc(72vh * ${ratio}))`, aspectRatio: ratio };

  return (
    <motion.div
      className="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            className="lightbox-stage"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="lightbox-media" style={mediaStyle}>
              <Media item={item} controls full />
            </div>
            <aside className="lightbox-info">
              <span className="card-cat">{cat?.label}</span>
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
              <dl>
                {item.client && (
                  <>
                    <dt>Client</dt>
                    <dd>{item.client}</dd>
                  </>
                )}
                {item.year && (
                  <>
                    <dt>Year</dt>
                    <dd>{item.year}</dd>
                  </>
                )}
                <dt>Format</dt>
                <dd>{item.type === 'video' ? 'Motion / Video' : 'Static design'}</dd>
              </dl>
              <div className="lightbox-count">
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </div>
            </aside>
          </motion.div>
        </AnimatePresence>
      </div>

      <button className="lb-btn lb-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
      {items.length > 1 && (
        <>
          <button className="lb-btn lb-prev" onClick={(e) => (e.stopPropagation(), prev())} aria-label="Previous">
            ←
          </button>
          <button className="lb-btn lb-next" onClick={(e) => (e.stopPropagation(), next())} aria-label="Next">
            →
          </button>
        </>
      )}
    </motion.div>
  );
}
