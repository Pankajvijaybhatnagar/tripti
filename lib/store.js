import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const ROOT = process.cwd();
export const DATA_FILE = path.join(ROOT, 'data', 'works.json');
export const UPLOAD_DIR = path.join(ROOT, 'uploads');

export const MIME_TO_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/quicktime': 'mov',
};

export const EXT_TO_MIME = Object.fromEntries(
  Object.entries(MIME_TO_EXT).map(([m, e]) => [e, m])
);

export async function getWorks() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const list = JSON.parse(raw);
    return list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch {
    return [];
  }
}

export async function saveWorks(list) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2));
}

export function isAuthorized(req) {
  const expected = process.env.ADMIN_PASSWORD;
  const given = req.headers.get('x-admin-password') || '';
  if (!expected) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function newId() {
  return Date.now().toString(36) + '-' + crypto.randomBytes(4).toString('hex');
}

export async function saveUpload(file, baseName) {
  const ext = MIME_TO_EXT[file.type];
  if (!ext) throw new Error(`Unsupported file type: ${file.type || 'unknown'}`);
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const name = `${baseName}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, name), buf);
  return `/api/media/${name}`;
}

export async function removeUpload(src) {
  if (!src || !src.startsWith('/api/media/')) return;
  const name = path.basename(src);
  try {
    await fs.unlink(path.join(UPLOAD_DIR, name));
  } catch {}
}
