# EduTrust Ops Stripe Pricing Guide

## Overview

This document outlines the pricing structure for EduTrust Ops and provides instructions for managing products and prices in Stripe.

## Pricing Structure

### Subscription Tiers

1. **Core Plan**
   - Monthly: $4,999/month
   - Annual: $49,990/year (17% discount)
   - Target: Institutions up to 5,000 students
   - Key Features:
     - All 4 Trust Operations modules
     - 1 connector pack (Web + LMS)
     - Evidence Binder with quarterly reports
     - Monthly WCAG accessibility scans
     - Cyber baseline assessment (NIST CSF 2.0)
     - AI governance policy templates
     - FVT/GE compliance tracking
     - Email support (48hr response)
     - Quarterly executive briefings

2. **Pro Plan** (Most Popular)
   - Monthly: $9,999/month
   - Annual: $99,990/year (17% discount)
   - Target: Institutions up to 20,000 students
   - Key Features:
     - Everything in Core, plus:
     - Multi-campus/unit support
     - SSO integration (SAML/OIDC)
     - Ticketing sync (Jira/ServiceNow)
     - 3 VPAT/ACR review credits per year
     - Advanced connectors (SIS, IdP, Storage)
     - Weekly accessibility monitoring
     - Custom compliance workflows
     - Priority support (8hr response)
     - Monthly strategy sessions

3. **Enterprise Plan**
   - Monthly: $16,999/month
   - Annual: $169,990/year (17% discount)
   - Target: Unlimited students
   - Key Features:
     - Everything in Pro, plus:
     - Unlimited campuses & units
     - Custom API integrations
     - Data residency options
     - White-glove onboarding
     - Dedicated success manager
     - Premium SLA (1hr P1 response)
     - Unlimited VPAT/ACR reviews
     - Custom reporting & dashboards
     - Quarterly on-site reviews

### Add-On Products

1. **PDF Remediation Credits**: $99/document
   - 508-compliant PDF remediation

2. **FCC Pilot Application Support**: $4,999
   - Complete application assistance

3. **FVT/GE NSLDS File QA**: $2,499/review
   - Pre-submission validation

4. **Emergency Response**: $999/incident
   - 24/7 crisis support

## Setting Up Stripe Products

### Prerequisites

1. Stripe account with API access
2. Node.js installed
3. Stripe CLI (optional but recommended)

### Initial Setup

1. **Install dependencies:**
   ```bash
   npm install stripe
   ```

2. **Set your Stripe secret key:**
   ```bash
   export STRIPE_SECRET_KEY="sk_test_..." # Use your test key for testing
   ```

3. **Run the setup script:**
   ```bash
   npx tsx scripts/stripe-setup.ts
   ```

4. **Update your .env file with the generated price IDs:**
   ```env
   # Annual price IDs
   NEXT_PUBLIC_STRIPE_PRICE_CORE=price_xxx
   NEXT_PUBLIC_STRIPE_PRICE_PRO=price_xxx
   NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE=price_xxx

   # Monthly price IDs
   NEXT_PUBLIC_STRIPE_PRICE_CORE_MONTHLY=price_xxx
   NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY=price_xxx
   NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE_MONTHLY=price_xxx
   ```

## Testing the Integration

### Test Cards

Use these test card numbers in Stripe's test mode:

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

### Test Flow

1. Navigate to `/pricing`
2. Select a billing period (monthly/annual)
3. Click "Get Started" on any tier
4. Complete the Stripe checkout
5. Verify redirect to `/success`

## Webhook Configuration

The application listens for these Stripe events:

- `checkout.session.completed` - New subscription created
- `customer.subscription.updated` - Subscription changes
- `customer.subscription.deleted` - Cancellations
- `invoice.payment_failed` - Failed payments

Configure webhooks in Stripe Dashboard:
1. Go to Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe/webhook`
3. Select events listed above
4. Copy the webhook secret to `STRIPE_WEBHOOK_SECRET`

## Managing Subscriptions

### Changing Plans

Customers can upgrade/downgrade through:
1. Customer portal (Stripe hosted)
2. Custom upgrade flow at `/upgrade`

### Cancellations

Handle cancellations gracefully:
1. Offer to pause instead of cancel
2. Collect feedback
3. Provide export options
4. Send win-back campaigns

## Discounts & Coupons

### Volume Discounts

- State systems: 20% off
- Consortiums: 30% off
- 50,000+ students: Custom pricing

Create coupons in Stripe Dashboard:
1. Products → Coupons → Create
2. Set percentage or fixed amount
3. Add restrictions (e.g., specific products)

### Promotional Codes

Example campaigns:
- `EDTECH2024` - 20% off first 3 months
- `PILOT` - 50% off first month
- `NONPROFIT` - 15% ongoing discount

## Financial Reporting

Key metrics to track:

1. **MRR (Monthly Recurring Revenue)**
   - Core: # subscriptions × price
   - Pro: # subscriptions × price
   - Enterprise: # subscriptions × price

2. **Churn Rate**
   - Monthly cancellations / total customers

3. **Customer Lifetime Value**
   - Average revenue per customer × average lifetime

4. **Conversion Rates**
   - Pricing page views → checkout starts
   - Checkout starts → completed

## Support & Troubleshooting

### Common Issues

1. **Price not found error**
   - Verify price IDs in .env match Stripe
   - Check for typos in tier names

2. **Checkout fails**
   - Verify API keys are correct
   - Check Stripe dashboard for errors
   - Ensure products are active

3. **Webhook failures**
   - Verify endpoint URL
   - Check webhook secret
   - Review Stripe webhook logs

### Contact

For billing support:
- Email: billing@edutrustops.com
- Stripe Dashboard: stripe.com/dashboard
- Documentation: stripe.com/docs
