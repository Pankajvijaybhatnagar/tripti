'use client';
import { useState } from 'react';
import { categories, site } from '@/lib/site';
import { Eyebrow, SplitReveal, Reveal } from './Reveal';
import Magnetic from './Magnetic';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: categories[0].label, message: '' });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New project: ${form.service} — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="container">
        <Eyebrow>Let&apos;s collaborate</Eyebrow>
        <SplitReveal className="contact-title" text="Got a bold idea? Let's make it *iconic." />

        <div className="contact-grid">
          <Reveal className="contact-side">
            <p>Tell me about your brand, your deadline and your wildest idea. I reply within 24 hours.</p>
            <a className="contact-big" href={`mailto:${site.email}`} data-cursor="Mail">
              {site.email}
            </a>
            <a className="contact-phone" href={`tel:${site.phone.replace(/\s/g, '')}`}>
              {site.phone}
            </a>
            <div className="socials">
              {site.socials.map((s) => (
                <Magnetic key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="social">
                    {s.label}
                  </a>
                </Magnetic>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form className="contact-form" onSubmit={submit}>
              <label>
                <span>Your name</span>
                <input required value={form.name} onChange={set('name')} placeholder="Jane Doe" />
              </label>
              <label>
                <span>Email</span>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="jane@brand.com" />
              </label>
              <label>
                <span>I need</span>
                <select value={form.service} onChange={set('service')}>
                  {categories.map((c) => (
                    <option key={c.id}>{c.label}</option>
                  ))}
                  <option>Full brand identity</option>
                </select>
              </label>
              <label>
                <span>Project details</span>
                <textarea required rows={4} value={form.message} onChange={set('message')} placeholder="Tell me everything…" />
              </label>
              <Magnetic>
                <button className="btn btn-cherry btn-lg" type="submit">
                  Send message <span className="btn-arrow">↗</span>
                </button>
              </Magnetic>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
