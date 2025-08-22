import Stripe from 'stripe';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

// Price IDs from environment
const priceIds = {
  core_annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE,
  core_monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY,
  pro_annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO,
  pro_monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY,
  enterprise_annual: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE,
  enterprise_monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY,
};

async function verifyStripeSetup() {
  console.log('🔍 Verifying Stripe setup...\n');

  // Check API key
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('❌ STRIPE_SECRET_KEY not found in environment variables');
    return;
  }

  try {
    // Test API connection
    const account = await stripe.accounts.retrieve();
    console.log(`✅ Connected to Stripe account: ${account.id}`);
    console.log(`   Mode: ${process.env.STRIPE_SECRET_KEY.startsWith('sk_test') ? 'TEST' : 'LIVE'}\n`);

    // Check configured price IDs
    console.log('📋 Checking configured price IDs:\n');
    
    for (const [key, priceId] of Object.entries(priceIds)) {
      if (!priceId) {
        console.log(`❌ ${key}: Not configured`);
        continue;
      }

      try {
        const price = await stripe.prices.retrieve(priceId);
        const product = await stripe.products.retrieve(price.product as string);
        
        console.log(`✅ ${key}: ${priceId}`);
        console.log(`   Product: ${product.name}`);
        const amount = price.unit_amount ? price.unit_amount / 100 : 0;
        console.log(`   Amount: $${amount} ${price.currency.toUpperCase()}`);
        const billing = price.recurring ? price.recurring.interval + 'ly' : 'one-time';
        console.log(`   Billing: ${billing}\n`);
      } catch (error) {
        console.log(`❌ ${key}: Invalid price ID (${priceId})`);
        console.log(`   Error: ${(error as Error).message}\n`);
      }
    }

    // List all products for reference
    console.log('\n📦 All products in your Stripe account:\n');
    const products = await stripe.products.list({ limit: 20 });
    
    for (const product of products.data) {
      console.log(`Product: ${product.name} (${product.id})`);
      
      // Get prices for this product
      const prices = await stripe.prices.list({ product: product.id, limit: 10 });
      for (const price of prices.data) {
        const interval = price.recurring ? `/${price.recurring.interval}` : ' (one-time)';
        const priceAmount = price.unit_amount ? price.unit_amount / 100 : 0;
        console.log(`  └─ ${price.id}: $${priceAmount}${interval}`);
      }
      console.log('');
    }

    // Check webhook endpoint
    console.log('🔗 Webhook endpoints:\n');
    const webhooks = await stripe.webhookEndpoints.list({ limit: 10 });
    
    if (webhooks.data.length === 0) {
      console.log('⚠️  No webhook endpoints configured');
      console.log('   Add webhook endpoint in Stripe Dashboard for production');
    } else {
      for (const webhook of webhooks.data) {
        console.log(`Endpoint: ${webhook.url}`);
        console.log(`Status: ${webhook.status}`);
        console.log(`Events: ${webhook.enabled_events.join(', ')}\n`);
      }
    }

  } catch (error) {
    console.error('❌ Error connecting to Stripe:', (error as Error).message);
  }
}

// Run verification
verifyStripeSetup();
