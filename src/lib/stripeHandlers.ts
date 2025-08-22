import prisma from './prisma';
import Stripe from 'stripe';

// Create a new tenant record from a completed checkout session. The session
// should include customer and subscription information. Optionally pass
// metadata (e.g. institution name) via the Stripe Checkout metadata field.
export async function createTenantFromCheckout(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string;
  const subscriptionId = session.subscription as string | null;
  const metadata = session.metadata || {};
  const name = metadata.institution_name || 'New Institution';
  await prisma.tenant.create({
    data: {
      name,
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId || undefined,
      tier: session.metadata?.tier || undefined,
    },
  });
  console.log('Tenant created from checkout:', name);
}

// Update an existing tenant record when the subscription tier changes.
export async function setTier(customerId: string, priceId: string) {
  // Map Stripe price IDs to your internal tier identifiers
  const tierMap: Record<string, string> = {
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE || '']: 'core',
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO || '']: 'pro',
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || '']: 'enterprise',
  };
  const tier = tierMap[priceId] || 'core';
  await prisma.tenant.updateMany({
    where: { stripeCustomerId: customerId },
    data: { tier },
  });
  console.log(`Updated tenant ${customerId} to tier ${tier}`);
}