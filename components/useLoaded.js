'use client';
import { useEffect, useState } from 'react';

// true once the preloader has finished — used to kick off hero animations.
export default function useLoaded() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (window.__appLoaded) {
      setLoaded(true);
      return;
    }
    const h = () => setLoaded(true);
    window.addEventListener('app:loaded', h);
    return () => window.removeEventListener('app:loaded', h);
  }, []);
  return loaded;
}
