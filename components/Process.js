'use client';
import { motion } from 'framer-motion';
import { steps } from '@/lib/site';
import { Eyebrow, SplitReveal } from './Reveal';

export default function Process() {
  return (
    <section id="process" className="section process">
      <div className="container">
        <div className="section-head">
          <div>
            <Eyebrow>How I work</Eyebrow>
            <SplitReveal className="section-title" text="From spark to *launch" />
          </div>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              className="step"
              initial={{ opacity: 0, y: 80, rotate: i % 2 ? 3 : -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="step-num">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="step-glow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
