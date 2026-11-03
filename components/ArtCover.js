// Generated cover art shown for sample projects (no uploaded media yet).
const VARIANTS = [
  { bg: 'linear-gradient(140deg,#b3161b 0%,#4a0708 100%)', fg: '#f4e8da', ac: '#1b100d' },
  { bg: 'radial-gradient(circle at 75% 15%,#5c0a0b 0%,#1b100d 62%)', fg: '#f4e8da', ac: '#e3a35b' },
  { bg: '#f1e4d3', fg: '#2a1410', ac: '#a4161a' },
  { bg: 'linear-gradient(200deg,#c1272d 0%,#7d0d10 55%,#2e0a08 100%)', fg: '#f4e8da', ac: '#f4e8da' },
];

function hash(s) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

export default function ArtCover({ item }) {
  const v = VARIANTS[hash(item.id) % VARIANTS.length];
  const words = item.title.split(/[\s—\-.]+/).filter(Boolean);
  const initials = words
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  const style = { background: v.bg, '--fg': v.fg, '--ac': v.ac };

  let inner;
  switch (item.category) {
    case 'reels':
      inner = (
        <>
          <div className="art-phone">
            <div className="art-phone-screen">
              <span className="art-play">▶</span>
              <span className="art-phone-title">{words.slice(0, 2).join(' ')}</span>
              <span className="art-phone-bars">
                <i /><i /><i />
              </span>
            </div>
          </div>
          <span className="art-tag">REEL • 0:30</span>
        </>
      );
      break;
    case 'logos':
      inner = (
        <>
          <div className="art-mono">{initials}</div>
          <span className="art-brand">{item.title}</span>
        </>
      );
      break;
    case 'thumbnails':
      inner = (
        <>
          <div className="art-thumb-word">{words[0]}</div>
          <div className="art-thumb-sub">{words.slice(1).join(' ')}</div>
          <span className="art-thumb-play">▶</span>
          <span className="art-thumb-time">12:48</span>
        </>
      );
      break;
    case 'posters':
      inner = (
        <>
          <div className="art-poster-circle" />
          <div className="art-poster-words">
            {words.slice(0, 3).map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>
          <div className="art-poster-foot">
            <span>{item.year}</span>
            <span>LIVE • ENTRY FREE</span>
          </div>
        </>
      );
      break;
    case 'magazines':
      inner = (
        <>
          <div className="art-mag-head">{words[0]}</div>
          <div className="art-mag-lines">
            <span>THE BOLD ISSUE</span>
            <span>Design • Culture • Style</span>
            <span>{words.slice(1).join(' ')}</span>
          </div>
          <div className="art-mag-figure" />
          <div className="art-barcode" />
        </>
      );
      break;
    case 'packaging':
      inner = (
        <div className="art-box">
          <div className="art-box-top" />
          <div className="art-box-front">
            <span className="art-box-mono">{initials}</span>
            <span className="art-box-name">{item.title}</span>
          </div>
          <div className="art-box-side" />
        </div>
      );
      break;
    case 'visiting-cards':
      inner = (
        <>
          <div className="art-card art-card-back">
            <span>{initials}</span>
          </div>
          <div className="art-card art-card-front">
            <strong>{item.title}</strong>
            <small>Principal • Studio</small>
            <small>hello@studio.com</small>
          </div>
        </>
      );
      break;
    case 'bookmarks':
      inner = (
        <div className="art-bookmark">
          <span className="art-bookmark-star">✿</span>
          <span className="art-bookmark-title">{item.title}</span>
          <span className="art-bookmark-quote">&ldquo;read slowly&rdquo;</span>
          <span className="art-bookmark-tassel" />
        </div>
      );
      break;
    default:
      inner = <div className="art-mono">{initials}</div>;
  }

  return (
    <div className={`art art-${item.category}`} style={style}>
      {inner}
    </div>
  );
}
