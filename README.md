# EduTrustOps Platform

This repository contains a starter implementation of **EduTrustOps™**, a modular compliance and trust operations platform for K‑12 and higher‑education institutions. It is designed to be deployed as a Next.js 14 application with PostgreSQL, Prisma for the ORM and Stripe for subscription management. The site includes marketing pages, a demo request form, pricing with self‑service checkout and a Stripe webhook that provisions a tenant in the database on successful checkout.

## Project Structure

```
edutrustops/
├── package.json           # npm scripts and dependencies
├── tsconfig.json          # TypeScript configuration
├── next.config.js         # Next.js configuration (App Router enabled)
├── prisma/
│   └── schema.prisma      # Database schema for Prisma
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── layout.tsx     # Root layout with navigation
│   │   ├── globals.css    # Global styles
│   │   ├── page.tsx       # Home page (hero + metrics)
│   │   ├── solutions/     # Solutions subpage
│   │   ├── platform/      # Platform subpage
│   │   ├── pricing/       # Pricing page with subscription buttons
│   │   ├── resources/     # Resources page
│   │   ├── trust-center/  # Security/privacy/accessibility posture
│   │   ├── book-a-demo/   # Demo request form
│   │   └── api/           # API routes (checkout, webhook, demo)
│   └── lib/               # Server‑side helpers (Prisma, Stripe handlers)
│       ├── prisma.ts      # Singleton Prisma client
│       └── stripeHandlers.ts # Tenant provisioning based on Stripe events
└── .env.example           # Environment variables template
```

## Running locally

1. **Install dependencies** (requires Node.js ≥ 18 and npm):

   ```bash
   npm install
   ```

2. **Provision a PostgreSQL database**. You can use Railway, Neon or any hosted service. Create a database named `edutrustops` and obtain its connection string.

3. **Configure environment variables**. Copy `.env.example` to `.env` and replace the placeholder values:

   ```bash
   cp .env.example .env
   # Edit .env with your database URL, Stripe keys and product IDs
   ```

   - `DATABASE_URL` – connection string for your PostgreSQL instance
   - `STRIPE_SECRET_KEY` – secret key for your Stripe account
   - `STRIPE_WEBHOOK_SECRET` – webhook signing secret from your Stripe dashboard
   - `NEXT_PUBLIC_STRIPE_PRICE_CORE`, `NEXT_PUBLIC_STRIPE_PRICE_PRO`, `NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE` – price IDs for the Core/Pro/Enterprise subscriptions
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` – your Stripe publishable key (used by client)
   - `NEXT_PUBLIC_BASE_URL` – the base URL of your deployed app (e.g. `https://edutrustops.org`)

4. **Generate the Prisma client and run migrations**:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

   This will create the required `Tenant` table in your database.

5. **Start the development server**:

   ```bash
   npm run dev
   ```

6. Navigate to `http://localhost:3000` in your browser to see the site.

## Deploying to Vercel

1. Create a new GitHub repository for this code (if you haven’t already). Commit and push the contents of this directory to GitHub.

2. Sign in to [Vercel](https://vercel.com/) and import your repository. When prompted, set the environment variables listed above in the Vercel dashboard.

3. Point your domain (`edutrustops.org`) to Vercel by updating DNS records. Vercel will provision an SSL certificate automatically.

4. Configure the Stripe webhook:

   - In your Stripe dashboard, add an endpoint with the URL `https://edutrustops.org/api/stripe/webhook`.
   - Subscribe to `checkout.session.completed` and `customer.subscription.updated` events.
   - Copy the webhook signing secret into your `STRIPE_WEBHOOK_SECRET` environment variable on Vercel.

5. After deployment, the pricing buttons will redirect customers to Stripe checkout. When checkout completes, the webhook creates or updates a `Tenant` record in your database.

## Next steps

This starter provides the marketing site, subscription flow and basic data model. The next phase of development should implement the following features:

- **User Authentication & SSO**: integrate an auth provider like Clerk or Auth0 for identity management. Use SAML/OIDC for enterprise plans.
- **Agents & Background Jobs**: implement the accessibility crawler, cyber baseline auditor, AI policy assistant and FVT/GE reporter described in the product blueprint. These can be deployed as serverless functions or AWS Lambda scheduled jobs.
- **Evidence Binder**: design a data model for artefacts and narratives, implement storage of evidence (e.g. S3) and export as PDF/HTML.
- **Dashboard UI**: build dashboards with charts and Power BI embeds to display the Trust Score and module metrics.
- **CRM Integration**: send demo requests to a CRM or email service for follow‑up.
- **Legal Pages**: add full Privacy Policy, Terms of Service, Data Processing Addendum and Accessibility Statement.

With these extensions, EduTrustOps™ will be a fully operational, automated platform ready for national K‑12 and higher‑education clients.# edutrustops
