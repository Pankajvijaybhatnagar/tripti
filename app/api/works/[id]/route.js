import { NextResponse } from 'next/server';
import { getWorks, saveWorks, isAuthorized, removeUpload } from '@/lib/store';

export const runtime = 'nodejs';

export async function DELETE(req, { params }) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Wrong admin password' }, { status: 401 });
  }
  const { id } = await params;
  const works = await getWorks();
  const item = works.find((w) => w.id === id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await removeUpload(item.src);
  await removeUpload(item.cover);
  await saveWorks(works.filter((w) => w.id !== id));
  return NextResponse.json({ ok: true });
}
