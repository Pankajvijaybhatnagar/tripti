'use client';
import { motion } from 'framer-motion';
import { categories } from '@/lib/site';
import { Eyebrow, SplitReveal } from './Reveal';
import { scrollToId } from './SmoothScroll';

export default function Services({ works }) {
  const count = (id) => works.filter((w) => w.category === id).length;

  const open = (id) => {
    window.dispatchEvent(new CustomEvent('filter-work', { detail: id }));
    scrollToId('work');
  };

  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-head">
          <div>
            <Eyebrow>What I do</Eyebrow>
            <SplitReveal className="section-title" text="Services that *sell" />
          </div>
          <p className="section-sub">Eight disciplines, one obsession: making your brand impossible to scroll past.</p>
        </div>

        <ul className="svc-list">
          {categories.map((c, i) => (
            <motion.li
              key={c.id}
              className="svc"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <button onClick={() => open(c.id)} data-cursor="See work">
                <span className="svc-num">0{i + 1}</span>
                <span className="svc-name">{c.label}</span>
                <span className="svc-desc">{c.desc}</span>
                <span className="svc-count">{count(c.id)} projects</span>
                <span className="svc-arrow">↗</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
