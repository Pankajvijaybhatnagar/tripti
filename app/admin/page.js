'use client';
import { useEffect, useRef, useState } from 'react';
import { categories, categoryMap } from '@/lib/site';
import { Media } from '@/components/Media';

const KEY = 'portfolio-admin-pw';
const blank = { title: '', category: 'reels', client: '', year: String(new Date().getFullYear()), description: '' };

export default function Admin() {
  const [pw, setPw] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');
  const [works, setWorks] = useState([]);
  const [form, setForm] = useState(blank);
  const [file, setFile] = useState(null);
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(null);
  const [msg, setMsg] = useState('');
  const [drag, setDrag] = useState(false);
  const [filter, setFilter] = useState('all');
  const fileRef = useRef(null);

  const load = () => fetch('/api/works', { cache: 'no-store' }).then((r) => r.json()).then(setWorks);

  const verify = async (p) => {
    const r = await fetch('/api/admin/verify', { method: 'POST', headers: { 'x-admin-password': p } });
    if (r.ok) {
      setAuthed(true);
      setError('');
      try { sessionStorage.setItem(KEY, p); } catch {}
      load();
    } else {
      const j = await r.json().catch(() => ({}));
      setError(j.error || 'Wrong password');
    }
  };

  useEffect(() => {
    let saved = '';
    try { saved = sessionStorage.getItem(KEY) || ''; } catch {}
    if (saved) {
      setPw(saved);
      verify(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const pick = (f) => {
    if (!f) return;
    setFile(f);
    if (!form.title) setForm((s) => ({ ...s, title: f.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ') }));
    if (f.type.startsWith('video/') && form.category !== 'reels') setForm((s) => ({ ...s, category: 'reels' }));
  };

  const upload = (e) => {
    e.preventDefault();
    if (!file) return setMsg('Please choose a file first.');
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append('file', file);
    if (cover) fd.append('cover', cover);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/works');
    xhr.setRequestHeader('x-admin-password', pw);
    xhr.upload.onprogress = (ev) => ev.lengthComputable && setProgress(Math.round((ev.loaded / ev.total) * 100));
    xhr.onload = () => {
      setProgress(null);
      if (xhr.status < 300) {
        setMsg('✓ Uploaded! It is now live on your portfolio.');
        setForm({ ...blank, category: form.category });
        setFile(null);
        setCover(null);
        if (fileRef.current) fileRef.current.value = '';
        load();
      } else {
        let err = 'Upload failed';
        try { err = JSON.parse(xhr.responseText).error; } catch {}
        setMsg('✕ ' + err);
      }
    };
    xhr.onerror = () => {
      setProgress(null);
      setMsg('✕ Network error');
    };
    setMsg('');
    xhr.send(fd);
  };

  const remove = async (id) => {
    if (!confirm('Delete this project permanently?')) return;
    const r = await fetch(`/api/works/${id}`, { method: 'DELETE', headers: { 'x-admin-password': pw } });
    if (r.ok) load();
    else alert('Delete failed');
  };

  const logout = () => {
    try { sessionStorage.removeItem(KEY); } catch {}
    setAuthed(false);
    setPw('');
  };

  if (!authed) {
    return (
      <main className="admin admin-login">
        <form
          className="admin-card"
          onSubmit={(e) => {
            e.preventDefault();
            verify(pw);
          }}
        >
          <span className="admin-logo">✿</span>
          <h1>Studio Admin</h1>
          <p>Enter your password to manage the portfolio.</p>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" autoFocus />
          {error && <div className="admin-error">{error}</div>}
          <button className="btn btn-cherry">Unlock</button>
          <a href="/" className="admin-back">← Back to site</a>
        </form>
      </main>
    );
  }

  const shown = filter === 'all' ? works : works.filter((w) => w.category === filter);

  return (
    <main className="admin">
      <header className="admin-head">
        <div>
          <span className="admin-logo">✿</span>
          <h1>Portfolio Manager</h1>
        </div>
        <div className="admin-head-actions">
          <a href="/" target="_blank" className="btn btn-ghost btn-sm">View site ↗</a>
          <button className="btn btn-ghost btn-sm" onClick={logout}>Log out</button>
        </div>
      </header>

      <div className="admin-layout">
        <form className="admin-card admin-form" onSubmit={upload}>
          <h2>Upload new work</h2>

          <div
            className={`drop ${drag ? 'is-drag' : ''}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              pick(e.dataTransfer.files[0]);
            }}
            onClick={() => fileRef.current?.click()}
          >
            {preview ? (
              file?.type.startsWith('video/') ? (
                <video src={preview} muted autoPlay loop playsInline />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="preview" />
              )
            ) : (
              <div className="drop-empty">
                <span>⬆</span>
                <strong>Drop image or video here</strong>
                <small>JPG, PNG, WEBP, GIF, SVG, MP4, WEBM, MOV</small>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              hidden
              accept="image/*,video/mp4,video/webm,video/quicktime"
              onChange={(e) => pick(e.target.files[0])}
            />
          </div>
          {file && <div className="drop-name">{file.name} — {(file.size / 1024 / 1024).toFixed(2)} MB</div>}

          <div className="admin-row">
            <label>
              <span>Category</span>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Year</span>
              <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
            </label>
          </div>
          <label>
            <span>Title *</span>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label>
            <span>Client</span>
            <input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
          </label>
          <label>
            <span>Description</span>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          {file?.type.startsWith('video/') && (
            <label>
              <span>Cover image for video (optional)</span>
              <input type="file" accept="image/*" onChange={(e) => setCover(e.target.files[0] || null)} />
            </label>
          )}

          {progress !== null && (
            <div className="progress">
              <span style={{ width: `${progress}%` }} />
              <em>{progress}%</em>
            </div>
          )}
          {msg && <div className={`admin-msg ${msg.startsWith('✓') ? 'ok' : 'bad'}`}>{msg}</div>}

          <button className="btn btn-cherry" disabled={progress !== null}>
            {progress !== null ? 'Uploading…' : 'Publish to portfolio'}
          </button>
        </form>

        <section className="admin-card admin-list">
          <div className="admin-list-head">
            <h2>Your projects ({works.length})</h2>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="admin-grid">
            {shown.map((w) => (
              <div className="admin-item" key={w.id}>
                <div className="admin-thumb">
                  <Media item={w} />
                </div>
                <div className="admin-item-info">
                  <strong>{w.title}</strong>
                  <small>
                    {categoryMap[w.category]?.label} · {w.type === 'art' ? 'sample' : w.type}
                  </small>
                </div>
                <button className="admin-del" onClick={() => remove(w.id)} aria-label="Delete">
                  🗑
                </button>
              </div>
            ))}
            {!shown.length && <p className="admin-none">Nothing here yet.</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
