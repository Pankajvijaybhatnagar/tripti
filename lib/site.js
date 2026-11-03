// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to personalise the whole portfolio.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Tripti',
  fullName: 'Tripti',
  role: 'Graphic Designer & Visual Storyteller',
  location: 'New Delhi, India',
  timezone: 'Asia/Kolkata',
  email: 'hello@yourdomain.com',
  phone: '+91 98765 43210',
  intro:
    'I craft bold brand identities, scroll-stopping reels and print that people actually keep. Every pixel has a purpose — every colour tells a story.',
  about:
    'I am a multidisciplinary graphic designer who turns ideas into visuals that feel alive. From the first sketch of a logo to the last frame of a reel, I blend strategy, typography and motion to build brands that are impossible to ignore.',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Behance', href: 'https://behance.net/' },
    { label: 'Dribbble', href: 'https://dribbble.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
  ],
  stats: [
    { value: 6, suffix: '+', label: 'Years of craft' },
    { value: 240, suffix: '+', label: 'Projects delivered' },
    { value: 120, suffix: '+', label: 'Happy clients' },
    { value: 18, suffix: 'M', label: 'Reel views' },
  ],
  testimonials: [
    {
      quote:
        'Our rebrand doubled our walk-ins within a month. The logo and packaging feel premium and unmistakably ours.',
      name: 'Riya Mehra',
      role: 'Founder, Rosé Tea Co.',
    },
    {
      quote:
        'The reels she edited for our launch crossed a million views. Sharp, fast, creative — a dream to work with.',
      name: 'Arjun Kapoor',
      role: 'Marketing Head, Monsoon Brew',
    },
    {
      quote:
        'Thumbnails redesigned, CTR up 64%. She understands attention like nobody else I have hired.',
      name: 'Sana Iqbal',
      role: 'YouTuber, Tech Unboxed',
    },
  ],
};

// The 8 work categories. `ratio` = width / height of the default frame.
export const categories = [
  { id: 'reels', label: 'Reels & Videos', short: 'Reels', ratio: 9 / 16, desc: 'Instagram reels, promos & motion edits that stop the scroll.' },
  { id: 'logos', label: 'Logo Design', short: 'Logos', ratio: 1, desc: 'Memorable marks and identity systems built to last.' },
  { id: 'thumbnails', label: 'Thumbnails', short: 'Thumbnails', ratio: 16 / 9, desc: 'High-CTR YouTube thumbnails engineered for clicks.' },
  { id: 'posters', label: 'Posters', short: 'Posters', ratio: 3 / 4, desc: 'Event, film & campaign posters with loud typography.' },
  { id: 'magazines', label: 'Magazine', short: 'Magazine', ratio: 3 / 4, desc: 'Editorial covers and layouts with rhythm and grid.' },
  { id: 'packaging', label: 'Packaging', short: 'Packaging', ratio: 4 / 5, desc: 'Shelf-ready packaging that sells before it is opened.' },
  { id: 'visiting-cards', label: 'Visiting Cards', short: 'Cards', ratio: 7 / 4, desc: 'Business cards that make the first handshake unforgettable.' },
  { id: 'bookmarks', label: 'Bookmarks', short: 'Bookmarks', ratio: 2 / 5, desc: 'Illustrated bookmarks & small-format print pieces.' },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c]));

export const steps = [
  { title: 'Discover', text: 'Deep-dive into your brand, audience and competitors to find the angle nobody owns yet.' },
  { title: 'Concept', text: 'Moodboards, sketches and bold directions. We pick the one that gives you goosebumps.' },
  { title: 'Craft', text: 'Pixel-perfect execution in type, colour, motion and print-ready detail.' },
  { title: 'Deliver', text: 'Every format, every size, organised and ready to launch — plus support after.' },
];
