# EduTrust Ops Scripts

This directory contains utility scripts for managing the EduTrust Ops platform.

## Stripe Setup Scripts

### stripe-setup.ts

Creates all the products and prices in your Stripe account based on the pricing structure defined in the application.

**Usage:**
```bash
# Set your Stripe secret key (use test key for testing)
export STRIPE_SECRET_KEY="sk_test_..."

# Run the setup script
npx tsx scripts/stripe-setup.ts
```

This will create:
- 3 subscription products (Core, Pro, Enterprise)
- 6 prices (monthly and annual for each tier)
- 4 add-on products with one-time prices

**Important:** After running, copy the generated price IDs and update your `.env` file.

### verify-stripe-setup.ts

Verifies that your Stripe integration is properly configured.

**Usage:**
```bash
# Make sure your .env file is configured
npx tsx scripts/verify-stripe-setup.ts
```

This will check:
- API key connectivity
- All configured price IDs
- List all products in your account
- Webhook endpoint configuration

## Running Scripts

All TypeScript scripts can be run using `tsx`:

```bash
# Install tsx globally (if not already installed)
npm install -g tsx

# Run any script
npx tsx scripts/[script-name].ts
```

## Environment Variables

Scripts use the following environment variables:

- `STRIPE_SECRET_KEY` - Your Stripe secret API key
- `NEXT_PUBLIC_STRIPE_PRICE_*` - Price IDs for each tier

Make sure these are set in your `.env` file or exported in your shell before running the scripts.
