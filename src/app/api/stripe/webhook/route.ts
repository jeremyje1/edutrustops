import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createTenantFromCheckout, setTier, handleSubscriptionCanceled, handleInvoicePaymentFailed } from '@/lib/stripeHandlers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  const rawBody = await request.arrayBuffer();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      signature || '',
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed', err.message);
    return new NextResponse('Webhook Error: Invalid signature', { status: 400 });
  }
  console.log(`[stripe] ${event.type}`);
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await createTenantFromCheckout(session);
      break;
    }
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      await setTier(subscription.customer as string, subscription.items.data[0].price.id);
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionCanceled(subscription);
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      await handleInvoicePaymentFailed(invoice);
      break;
    }
    default:
      // Ignore other events for now
      break;
  }
  return NextResponse.json({ received: true });
}