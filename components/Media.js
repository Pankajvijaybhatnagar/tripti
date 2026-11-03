'use client';
import { useEffect, useRef } from 'react';
import { categoryMap } from '@/lib/site';
import ArtCover from './ArtCover';

export function Media({ item, playing = false, controls = false, full = false }) {
  const cat = categoryMap[item.category];
  const vref = useRef(null);

  useEffect(() => {
    const v = vref.current;
    if (!v || controls) return;
    if (playing) v.play().catch(() => {});
    else {
      v.pause();
    }
  }, [playing, controls]);

  if (item.type === 'video') {
    return (
      <video
        ref={vref}
        className="media-el"
        src={item.src}
        poster={item.cover || undefined}
        muted={!controls}
        loop={!controls}
        playsInline
        controls={controls}
        autoPlay={controls}
        preload="metadata"
        style={!full ? { aspectRatio: cat?.ratio } : undefined}
      />
    );
  }
  if (item.type === 'image' && item.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="media-el" src={item.src} alt={item.title} loading="lazy" />;
  }
  return (
    <div className="media-art" style={{ aspectRatio: cat?.ratio || 1 }}>
      <ArtCover item={item} />
    </div>
  );
}
