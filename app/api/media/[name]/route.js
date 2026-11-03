import path from 'path';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import { Readable } from 'stream';
import { UPLOAD_DIR, EXT_TO_MIME } from '@/lib/store';

export const runtime = 'nodejs';

const SAFE_NAME = /^[a-z0-9-]+\.(jpg|png|webp|gif|avif|svg|mp4|webm|mov)$/;

// Streams uploaded media with HTTP Range support so videos can seek.
export async function GET(req, { params }) {
  const { name } = await params;
  if (!SAFE_NAME.test(name)) return new Response('Not found', { status: 404 });

  const filePath = path.join(UPLOAD_DIR, name);
  let info;
  try {
    info = await stat(filePath);
  } catch {
    return new Response('Not found', { status: 404 });
  }

  const ext = name.split('.').pop();
  const size = info.size;
  const headers = {
    'Content-Type': EXT_TO_MIME[ext] || 'application/octet-stream',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=31536000, immutable',
  };
  if (ext === 'svg') headers['Content-Security-Policy'] = "default-src 'none'; style-src 'unsafe-inline'";

  const range = req.headers.get('range');
  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range);
    let start = 0;
    let end = size - 1;
    if (m) {
      if (m[1] === '' && m[2] !== '') {
        start = Math.max(0, size - parseInt(m[2], 10));
      } else {
        if (m[1] !== '') start = parseInt(m[1], 10);
        if (m[2] !== '') end = Math.min(parseInt(m[2], 10), size - 1);
      }
    }
    if (start > end || start >= size) {
      return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } });
    }
    const stream = createReadStream(filePath, { start, end });
    return new Response(Readable.toWeb(stream), {
      status: 206,
      headers: {
        ...headers,
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': String(end - start + 1),
      },
    });
  }

  return new Response(Readable.toWeb(createReadStream(filePath)), {
    headers: { ...headers, 'Content-Length': String(size) },
  });
}
