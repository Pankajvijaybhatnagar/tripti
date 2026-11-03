import { Fraunces, Nunito, Instrument_Serif, Great_Vibes } from 'next/font/google';
import { site } from '@/lib/site';
import './globals.css';

const display = Fraunces({ subsets: ['latin'], axes: ['SOFT', 'WONK', 'opsz'], style: ['normal', 'italic'], variable: '--font-display' });
const body = Nunito({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-body' });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-script" });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-serif' });

export const metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.intro,
};

export const viewport = {
  themeColor: '#1b100d',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${serif.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
