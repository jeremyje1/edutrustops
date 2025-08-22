import Stripe from 'stripe';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Params = { searchParams?: { session_id?: string } };

export default async function SuccessPage({ searchParams }: Params) {
  const sessionId = searchParams?.session_id;
  if (!sessionId) {
    redirect('/pricing?error=missing_session');
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Missing STRIPE_SECRET_KEY env var');
    redirect('/pricing?error=server_config');
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });
  try {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const tier = session.metadata?.tier || 'core';
    redirect(`/assessment/start?tier=${encodeURIComponent(tier)}`);
  } catch (e: any) {
    console.error('Failed to retrieve checkout session', e?.message || e);
    redirect('/pricing?error=session_lookup');
  }
}
