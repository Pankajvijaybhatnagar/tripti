'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { categories, categoryMap } from '@/lib/site';
import { Media } from './Media';
import Lightbox from './Lightbox';
import { Eyebrow, SplitReveal } from './Reveal';

function Card({ item, index, onOpen }) {
  const [hover, setHover] = useState(false);
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const cat = categoryMap[item.category];

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -10);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
    setHover(false);
  };

  return (
    <motion.article
      className="card"
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (index % 6) * 0.06 }}
    >
      <motion.div
        className="card-inner"
        style={{ rotateX: rx, rotateY: ry }}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={leave}
        onClick={onOpen}
        data-cursor={item.type === 'video' ? 'Play' : 'View'}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      >
        <div className="card-media">
          <Media item={item} playing={hover} />
          {item.type === 'video' && <span className="card-video-badge">▶ Video</span>}
        </div>
        <div className="card-overlay">
          <span className="card-cat">{cat?.short}</span>
          <div className="card-info">
            <h3>{item.title}</h3>
            <p>
              {item.client}
              {item.client && item.year ? ' — ' : ''}
              {item.year}
            </p>
          </div>
          <span className="card-arrow">↗</span>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Work({ works }) {
  const [filter, setFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);
  const [limit, setLimit] = useState(12);

  useEffect(() => {
    const h = (e) => {
      setFilter(e.detail);
      setLimit(12);
    };
    window.addEventListener('filter-work', h);
    return () => window.removeEventListener('filter-work', h);
  }, []);

  const counts = useMemo(() => {
    const c = { all: works.length };
    works.forEach((w) => (c[w.category] = (c[w.category] || 0) + 1));
    return c;
  }, [works]);

  const filtered = useMemo(
    () => (filter === 'all' ? works : works.filter((w) => w.category === filter)),
    [works, filter]
  );
  const visible = filtered.slice(0, limit);

  const tabs = [{ id: 'all', short: 'All Work' }, ...categories];

  return (
    <section id="work" className="section work">
      <div className="container">
        <div className="section-head">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <SplitReveal className="section-title" text="Things I've *crafted" />
          </div>
          <p className="section-sub">
            A curated mix of identities, motion, print and packaging. Hover to preview — click to dive in.
          </p>
        </div>

        <div className="filters" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={filter === t.id}
              className={`filter ${filter === t.id ? 'is-active' : ''}`}
              onClick={() => {
                setFilter(t.id);
                setLimit(12);
              }}
            >
              {filter === t.id && (
                <motion.span layoutId="filter-bg" className="filter-bg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              <span className="filter-label">{t.short}</span>
              <sup>{counts[t.id] || 0}</sup>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            <span>✿</span>
            <p>No projects here yet. Upload some from the admin panel.</p>
          </div>
        ) : (
          <div className="grid">
            <AnimatePresence mode="popLayout">
              {visible.map((item, i) => (
                <Card key={item.id} item={item} index={i} onOpen={() => setOpenIndex(i)} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {filtered.length > limit && (
          <div className="load-more">
            <button className="btn btn-ghost" onClick={() => setLimit((l) => l + 12)}>
              Load more projects <span className="btn-arrow">+</span>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {openIndex !== null && visible[openIndex] && (
          <Lightbox
            items={visible}
            index={openIndex}
            setIndex={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
