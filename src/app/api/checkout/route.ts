import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

export async function POST(req: Request) {
  const { tier, institution_name } = await req.json();
  // Map tiers to price IDs defined in environment variables
  const priceMap: Record<string, string | undefined> = {
    core: process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE,
    pro: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
    enterprise: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE,
  };
  const priceId = priceMap[tier];
  if (!priceId) {
    return new NextResponse('Invalid tier', { status: 400 });
  }
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      institution_name: institution_name || '',
      tier,
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?canceled=true`,
  });
  return NextResponse.json({ url: session.url });
}