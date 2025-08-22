import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message, institution, consent } = data || {};
    if (!email) return new NextResponse('Email required', { status: 400 });
    await prisma.lead.upsert({
      where: { email },
      update: { name, message, institution, consent: !!consent, source: 'demo_form' },
      create: { name, email, message, institution, consent: !!consent, source: 'demo_form' },
    });
    // Placeholder: send notification (email/webhook) in future iteration.
    return NextResponse.json({ message: 'OK' });
  } catch (err) {
    return new NextResponse('Invalid request', { status: 400 });
  }
}