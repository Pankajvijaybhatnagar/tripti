import { NextResponse } from 'next/server';
import { getWorks, saveWorks, isAuthorized, newId, saveUpload } from '@/lib/store';
import { categoryMap } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getWorks());
}

export async function POST(req) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Wrong admin password' }, { status: 401 });
  }
  try {
    const form = await req.formData();
    const file = form.get('file');
    const cover = form.get('cover');
    const category = String(form.get('category') || '');
    const title = String(form.get('title') || '').trim().slice(0, 120);

    if (!categoryMap[category]) {
      return NextResponse.json({ error: 'Pick a valid category' }, { status: 400 });
    }
    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    if (!file || typeof file === 'string' || !file.size) {
      return NextResponse.json({ error: 'Choose an image or video file' }, { status: 400 });
    }

    const id = newId();
    const src = await saveUpload(file, id);
    const type = file.type.startsWith('video/') ? 'video' : 'image';
    let coverSrc = null;
    if (cover && typeof cover !== 'string' && cover.size && cover.type.startsWith('image/')) {
      coverSrc = await saveUpload(cover, `${id}-cover`);
    }

    const item = {
      id,
      title,
      category,
      client: String(form.get('client') || '').trim().slice(0, 120),
      year: String(form.get('year') || new Date().getFullYear()).slice(0, 10),
      description: String(form.get('description') || '').trim().slice(0, 600),
      type,
      src,
      cover: coverSrc,
      createdAt: Date.now(),
    };

    const works = await getWorks();
    works.unshift(item);
    await saveWorks(works);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 400 });
  }
}
