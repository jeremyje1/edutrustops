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
  // Consolidate both annual and monthly price IDs for mapping
  const corePrices = [
    process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE,
    process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY,
  ].filter(Boolean);
  const proPrices = [
    process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
    process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY,
  ].filter(Boolean);
  const enterprisePrices = [
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE,
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY,
  ].filter(Boolean);

  const belongs = (list: (string | undefined)[]) => list.includes(priceId);
  let tier: string | null = null;
  if (belongs(corePrices)) tier = 'core';
  else if (belongs(proPrices)) tier = 'pro';
  else if (belongs(enterprisePrices)) tier = 'enterprise';

  if (!tier) {
    console.warn(`Unknown priceId ${priceId} – leaving tier unchanged`);
    return;
  }

  await prisma.tenant.updateMany({
    where: { stripeCustomerId: customerId },
    data: { tier },
  });
  console.log(`Updated tenant ${customerId} to tier ${tier}`);
}

// Clear subscription reference & optionally downgrade tier when a subscription is canceled
export async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  await prisma.tenant.updateMany({
    where: { stripeCustomerId: customerId },
    data: {
      stripeSubscriptionId: null,
      // Keep existing tier for historical access decisions; adjust if business rules require downgrade.
    },
  });
  console.log(`Subscription canceled for customer ${customerId}`);
}

// Record payment failure signal (requires schema extension for persistent tracking if desired)
export async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  console.warn(`Payment failed for customer ${customerId} (invoice ${invoice.id})`);
  // Placeholder: Extend Prisma schema with a BillingEvent model to persist failures and trigger notifications.
}