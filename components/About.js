'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion';
import { site } from '@/lib/site';
import { Eyebrow, Reveal } from './Reveal';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="about-word">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n}
      <em>{suffix}</em>
    </span>
  );
}

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = site.about.split(' ');

  return (
    <section id="about" className="section about">
      <div className="container">
        <Eyebrow>About me</Eyebrow>
        <p className="about-text" ref={ref}>
          {words.map((w, i) => {
            const start = i / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                {w}
              </Word>
            );
          })}
        </p>

        <div className="stats">
          {site.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="stat">
              <div className="stat-value">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="stat-label">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
