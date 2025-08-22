import Stripe from 'stripe';

// Check if API key is provided
const apiKey = process.env.STRIPE_SECRET_KEY;

if (!apiKey) {
  console.log('❌ No Stripe API key found!\n');
  console.log('Please run this script with your Stripe secret key:');
  console.log('\n  Option 1 - Set environment variable:');
  console.log('  export STRIPE_SECRET_KEY="sk_test_..." && npx tsx scripts/stripe-setup.ts\n');
  console.log('  Option 2 - Pass directly:');
  console.log('  STRIPE_SECRET_KEY="sk_test_..." npx tsx scripts/stripe-setup.ts\n');
  console.log('Get your API key from: https://dashboard.stripe.com/test/apikeys');
  console.log('\n⚠️  Use test keys (sk_test_...) for testing!');
  process.exit(1);
}

// Initialize Stripe with your secret key
const stripe = new Stripe(apiKey, { apiVersion: '2022-11-15' });

interface ProductPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
}

const products: ProductPlan[] = [
  {
    name: 'EduTrust Ops Core',
    description: 'Essential trust operations for institutions up to 5,000 students',
    monthlyPrice: 499900, // $4,999 in cents
    annualPrice: 4999000, // $49,990 in cents
    features: [
      'All 4 Trust Operations modules',
      '1 connector pack (Web + LMS)',
      'Evidence Binder with quarterly reports',
      'Monthly WCAG accessibility scans',
      'Cyber baseline assessment (NIST CSF 2.0)',
      'AI governance policy templates',
      'FVT/GE compliance tracking',
      'Email support (48hr response)',
      'Quarterly executive briefings',
    ],
  },
  {
    name: 'EduTrust Ops Pro',
    description: 'Advanced trust operations for institutions up to 20,000 students',
    monthlyPrice: 999900, // $9,999 in cents
    annualPrice: 9999000, // $99,990 in cents
    features: [
      'Everything in Core, plus:',
      'Multi-campus/unit support',
      'SSO integration (SAML/OIDC)',
      'Ticketing sync (Jira/ServiceNow)',
      '3 VPAT/ACR review credits per year',
      'Advanced connectors (SIS, IdP, Storage)',
      'Weekly accessibility monitoring',
      'Custom compliance workflows',
      'Priority support (8hr response)',
      'Monthly strategy sessions',
    ],
  },
  {
    name: 'EduTrust Ops Enterprise',
    description: 'Complete trust operations platform for unlimited students',
    monthlyPrice: 1699900, // $16,999 in cents
    annualPrice: 16999000, // $169,990 in cents
    features: [
      'Everything in Pro, plus:',
      'Unlimited campuses & units',
      'Custom API integrations',
      'Data residency options',
      'White-glove onboarding',
      'Dedicated success manager',
      'Premium SLA (1hr P1 response)',
      'Unlimited VPAT/ACR reviews',
      'Custom reporting & dashboards',
      'Quarterly on-site reviews',
    ],
  },
];

// Add-on products
const addOns = [
  {
    name: 'PDF Remediation Credits',
    description: '508-compliant PDF remediation service',
    price: 9900, // $99 per document
    type: 'one_time' as const,
  },
  {
    name: 'FCC Pilot Application Support',
    description: 'Complete application assistance for FCC programs',
    price: 499900, // $4,999
    type: 'one_time' as const,
  },
  {
    name: 'FVT/GE NSLDS File QA',
    description: 'Pre-submission validation for NSLDS files',
    price: 249900, // $2,499 per review
    type: 'one_time' as const,
  },
  {
    name: 'Emergency Response',
    description: '24/7 crisis support per incident',
    price: 99900, // $999 per incident
    type: 'one_time' as const,
  },
];

async function setupStripeProducts() {
  console.log('🚀 Starting Stripe product setup...\n');

  try {
    // Create main subscription products
    for (const product of products) {
      console.log(`Creating product: ${product.name}`);
      
      // Create the product
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.description,
        metadata: {
          features: JSON.stringify(product.features),
        },
      });

      console.log(`✅ Product created: ${stripeProduct.id}`);

      // Create monthly price
      const monthlyPrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.monthlyPrice,
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
        metadata: {
          billing_type: 'monthly',
        },
      });

      console.log(`  💵 Monthly price created: ${monthlyPrice.id} ($${product.monthlyPrice / 100}/month)`);

      // Create annual price
      const annualPrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.annualPrice,
        currency: 'usd',
        recurring: {
          interval: 'year',
        },
        metadata: {
          billing_type: 'annual',
        },
      });

      console.log(`  💵 Annual price created: ${annualPrice.id} ($${product.annualPrice / 100}/year)`);
      console.log('');
    }

    // Create add-on products
    console.log('Creating add-on products...\n');
    
    for (const addon of addOns) {
      console.log(`Creating add-on: ${addon.name}`);
      
      const addonProduct = await stripe.products.create({
        name: addon.name,
        description: addon.description,
      });

      const addonPrice = await stripe.prices.create({
        product: addonProduct.id,
        unit_amount: addon.price,
        currency: 'usd',
      });

      console.log(`✅ Add-on created: ${addonProduct.id}`);
      console.log(`  💵 Price: ${addonPrice.id} ($${addon.price / 100})`);
      console.log('');
    }

    console.log('🎉 All products and prices created successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Copy the price IDs from above');
    console.log('2. Update your .env file with the following:');
    console.log('   - NEXT_PUBLIC_STRIPE_PRICE_CORE (annual price for Core)');
    console.log('   - NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY (monthly price for Core)');
    console.log('   - NEXT_PUBLIC_STRIPE_PRICE_PRO (annual price for Pro)');
    console.log('   - NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY (monthly price for Pro)');
    console.log('   - NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE (annual price for Enterprise)');
    console.log('   - NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY (monthly price for Enterprise)');
    
  } catch (error) {
    console.error('❌ Error setting up Stripe products:', error);
  }
}

// Run the setup
setupStripeProducts();
