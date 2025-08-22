import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Stores snapshot requests as Leads (source = accessibility_snapshot) for follow up.
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, institution, baseUrl, consent } = data || {};
    if (!email || !baseUrl) return new NextResponse('Email and baseUrl required', { status: 400 });
    await prisma.lead.upsert({
      where: { email },
      update: { name, institution, message: `Snapshot for: ${baseUrl}`, consent: !!consent, source: 'accessibility_snapshot' },
      create: { name, email, institution, message: `Snapshot for: ${baseUrl}`, consent: !!consent, source: 'accessibility_snapshot' },
    });
    // Placeholder: enqueue crawl job in future iteration.
    return NextResponse.json({ message: 'OK' });
  } catch {
    return new NextResponse('Invalid request', { status: 400 });
  }
}
