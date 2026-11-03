'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { site } from '@/lib/site';
import { scrollToId } from './SmoothScroll';
import Magnetic from './Magnetic';

const links = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

const ease = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 300 && !open);
    setScrolled(v > 40);
  });

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else if (window.__appLoaded) window.__lenis?.start();
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 500 : 0);
  };

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        animate={{ y: hidden ? '-120%' : 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <button className="nav-logo" onClick={() => go('home')} aria-label="Back to top">
          <span className="nav-logo-mark">{site.name[0]}</span>
          <span className="nav-logo-text">
            {site.name}
            <em>.studio</em>
          </span>
        </button>

        <nav className="nav-links">
          {links.map((l) => (
            <button key={l.id} onClick={() => go(l.id)} className="nav-link">
              <span data-text={l.label}>{l.label}</span>
            </button>
          ))}
        </nav>

        <div className="nav-right">
          <Magnetic>
            <button className="btn btn-cherry btn-sm" onClick={() => go('contact')}>
              Let&apos;s talk <span className="btn-arrow">↗</span>
            </button>
          </Magnetic>
          <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-label="Menu">
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="menu-links">
              {links.map((l, i) => (
                <div className="mask" key={l.id}>
                  <motion.button
                    onClick={() => go(l.id)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%' }}
                    transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.06 }}
                  >
                    <small>0{i + 1}</small>
                    {l.label}
                  </motion.button>
                </div>
              ))}
            </div>
            <motion.div className="menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <div>
                {site.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
