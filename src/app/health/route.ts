import { NextResponse } from 'next/server';

// Lightweight runtime health info (no heavy imports to keep edge-friendly)
export async function GET() {
  const now = new Date();
  const pkgVersion = (globalThis as any)?.__APP_VERSION__ || '0.0.0';
  const env = (globalThis as any)?.process?.env?.VERCEL_ENV || 'unknown';
  return NextResponse.json({
    status: 'ok',
    service: 'edutrustops-app',
    time: now.toISOString(),
    epoch: now.getTime(),
    version: pkgVersion,
    env,
  });
}

export async function HEAD() { return new Response(null, { status: 204 }); }
