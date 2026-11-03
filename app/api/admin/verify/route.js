import { NextResponse } from 'next/server';
import { isAuthorized } from '@/lib/store';

export const runtime = 'nodejs';

export async function POST(req) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Set ADMIN_PASSWORD in .env.local first' }, { status: 500 });
  }
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
