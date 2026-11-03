'use client';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';
import { scrollToId } from './SmoothScroll';

export default function Footer() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', { timeZone: site.timezone, hour: '2-digit', minute: '2-digit' })
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <small>Local time</small>
            <p>{time} IST</p>
          </div>
          <div>
            <small>Socials</small>
            <p className="footer-socials">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </p>
          </div>
          <button className="to-top" onClick={() => scrollToId('home')} data-cursor="Top">
            ↑
          </button>
        </div>
        <div className="footer-name" aria-hidden="true">
          {site.name.toUpperCase()}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</span>
          <span>Made with ♡ &amp; a warm cup of chai</span>
        </div>
      </div>
    </footer>
  );
}
