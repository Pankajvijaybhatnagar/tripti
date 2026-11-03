const row1 = ['Logo Design', 'Reels & Motion', 'YouTube Thumbnails', 'Posters', 'Magazine Layouts'];
const row2 = ['Packaging', 'Visiting Cards', 'Bookmarks', 'Brand Identity', 'Social Media'];

function Track({ items, reverse }) {
  const list = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
      {[0, 1].map((k) => (
        <div className="marquee-group" key={k} aria-hidden={k === 1}>
          {list.map((t, i) => (
            <span key={i} className="marquee-item">
              {t} <span className="marquee-star">{i % 2 ? "♡" : "✿"}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Services">
      <div className="marquee-band band-cherry">
        <Track items={row1} />
      </div>
      <div className="marquee-band band-dark">
        <Track items={row2} reverse />
      </div>
    </section>
  );
}
