'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { site } from '@/lib/site';
import useLoaded from './useLoaded';
import Magnetic from './Magnetic';
import { scrollToId } from './SmoothScroll';

const ease = [0.22, 1, 0.36, 1];
const PETALS = Array.from({ length: 16 }, (_, i) => ({
  c: '',
  l: `${(i * 6.3 + (i % 3) * 2.1) % 100}%`,
  d: `${(i * 1.37) % 12}s`,
  t: `${11 + (i % 5) * 2.4}s`,
  s: `${10 + (i % 4) * 5}px`,
}));
const rotating = ['Logos', 'Reels', 'Posters', 'Packaging', 'Thumbnails', 'Magazines'];

function Line({ text, loaded, delay, className = '' }) {
  return (
    <span className={`hero-line ${className}`}>
      {text.split('').map((ch, i) => (
        <span className="mask" key={i}>
          <motion.span
            initial={{ y: '115%', rotate: 8 }}
            animate={loaded ? { y: 0, rotate: 0 } : {}}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.035 }}
          >
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const loaded = useLoaded();
  const [word, setWord] = useState(0);
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const bx = useSpring(useTransform(mx, (v) => v * 60), { stiffness: 60, damping: 20 });
  const by = useSpring(useTransform(my, (v) => v * 60), { stiffness: 60, damping: 20 });
  const bx2 = useSpring(useTransform(mx, (v) => v * -40), { stiffness: 50, damping: 20 });
  const by2 = useSpring(useTransform(my, (v) => v * -40), { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const id = setInterval(() => setWord((w) => (w + 1) % rotating.length), 2000);
    return () => clearInterval(id);
  }, []);

  const onMove = (e) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  return (
    <section id="home" className="hero" ref={ref} onMouseMove={onMove}>
      <div className="hero-bg" aria-hidden="true">
        <motion.div className="blob blob-1" style={{ x: bx, y: by }} />
        <motion.div className="blob blob-2" style={{ x: bx2, y: by2 }} />
        <div className="hero-grid" />
        {PETALS.map((p, i) => (
          <span key={i} className="petal" style={{ left: p.l, animationDelay: p.d, animationDuration: p.t, fontSize: p.s }}>
            {p.c}
          </span>
        ))}
      </div>

      <motion.div
        className="hero-top container"
        initial={{ opacity: 0, y: 20 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.9 }}
      >
        <span className="pill-tag">
          <span className="live-dot" /> Available for freelance
        </span>
        <span className="hero-loc">Based in {site.location}</span>
      </motion.div>

      <motion.div className="hero-main container" style={{ y: titleY, opacity: fade }}>
        <h1 className="hero-title">
          <Line text="CREATIVE" loaded={loaded} delay={0.1} />
          <span className="hero-row">
            <Line text="GRAPHIC" loaded={loaded} delay={0.3} className="outline" />
            <motion.span
              className="hero-swap"
              initial={{ scale: 0, rotate: -20 }}
              animate={loaded ? { scale: 1, rotate: -4 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={word}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                >
                  {rotating[word]}
                </motion.span>
              </AnimatePresence>
            </motion.span>
          </span>
          <span className="hero-row">
            <Line text="DESIGNER" loaded={loaded} delay={0.5} className="cherry" />
            <motion.span
              className="hero-signature"
              initial={{ opacity: 0, clipPath: "inset(-60% 100% -60% -20%)" }}
              animate={loaded ? { opacity: 1, clipPath: "inset(-60% -30% -60% -20%)" } : {}}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 1.1 }}
            >
              {site.name}
            </motion.span>
          </span>
        </h1>
      </motion.div>

      <div className="hero-bottom container">
        <motion.p
          className="hero-intro"
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 1.1 }}
        >
          Hi, I&apos;m <strong>{site.fullName}</strong> — {site.intro}
        </motion.p>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 30 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 1.25 }}
        >
          <Magnetic>
            <button className="btn btn-cherry" onClick={() => scrollToId('work')}>
              View my work <span className="btn-arrow">↓</span>
            </button>
          </Magnetic>
          <Magnetic>
            <button className="btn btn-ghost" onClick={() => scrollToId('contact')}>
              Hire me
            </button>
          </Magnetic>
        </motion.div>

        <motion.div
          className="badge"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={loaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease, delay: 1.3 }}
          data-cursor="Scroll"
          onClick={() => scrollToId('about')}
        >
          <svg viewBox="0 0 200 200" className="badge-text">
            <defs>
              <path id="circlePath" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
            </defs>
            <text>
              <textPath href="#circlePath">
                BRANDING ♡ MOTION ♡ PRINT ♡ PACKAGING ♡ SOCIAL ♡&nbsp;
              </textPath>
            </text>
          </svg>
          <span className="badge-core">♡</span>
        </motion.div>
      </div>
    </section>
  );
}
