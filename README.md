## EduTrustOps™ Platform

Turnkey Trust Operations for education institutions: Accessibility (ADA Title II / WCAG 2.1 AA), Cybersecurity (NIST CSF 2.0 + FCC Pilot alignment), AI Governance, and Financial Value Transparency / Gainful Employment (FVT/GE) evidence—unified in one multi‑tenant platform.

### A. Value Proposition (Hero)
"The turnkey way for districts and colleges to prove digital accessibility, reduce cyber risk, govern AI, and meet FVT/GE deadlines—with audit‑ready evidence, every day."

### B. Site Structure & Copy
Pages: Home, Solutions, Platform, Pricing, Resources, Trust Center, Book a Demo. Components: Hero, ValueClocks (regulatory drivers), OpsModules, Evidence Binder overview, Final CTA.

### C. Packaging & Pricing (Sample Tiers)
- Core: All four modules + baseline + quarterly board packet.
- Pro: Multi‑org, SSO, ticketing sync, VPAT credits.
- Enterprise: Advanced integrations, residency options, premium SLA.
Add‑ons: PDF remediation, FCC Pilot application support, FVT/GE NSLDS QA.

### D. Operating Model & Automation
90‑Day Install: Inventory → Baseline score → Backlog → Evidence Binder live → Exec packet.
Automation Flow: Lead form → `Lead` (Prisma) → Stripe Checkout → Webhook provisions `Tenant` (tier, metadata) → (Future) connectors gather evidence → Trust Score dashboards.

### E. Technical Architecture
Stack: Next.js App Router, Prisma + Postgres, Stripe billing, modular React components, JSON‑LD SEO.
Key Files:
- `prisma/schema.prisma`: `Tenant` + `Lead` models.
- `src/app/api/checkout`: Stripe session creation.
- `src/app/api/stripe/webhook`: Tenant provisioning & tier update.
- `src/app/api/demo`: Lead capture.
- `src/lib/stripeHandlers.ts`: Provisioning helpers.

### F. Data Governance & Compliance Mapping
- Accessibility: WCAG 2.1 AA evidence for ADA Title II phased deadlines (2026/27).
- Cyber: Posture mapping to NIST CSF 2.0; FCC Pilot control tagging.
- AI Governance: Policy registry, syllabus clauses, tool approvals aligned with U.S. ED guidance.
- FVT/GE: CIP→SOC mapping, NSLDS prep & QA, disclosure snippet generation, threshold alerts.
Controls: Data minimization, encryption in transit/at rest (in infra), future RBAC & retention policies.

### G. Sales Kit & GTM (Condensed)
Pitch: Three immovable clocks—ADA Title II, FCC cyber funding momentum, FVT/GE transparency deadlines—demand continuous evidence.
Differentiators: Unified Evidence Binder, 90‑day operationalization, modular expansion, automated baseline/backlog, exportable audit packets.
Proof Assets (planned): Accessibility snapshot teaser, Trust Score sample dashboard, redacted Evidence Binder export.

### H. 90‑Day Rollout Plan (High-Level)
Wks 1‑2: Inventory & baseline scans → initial Trust Score.
Wks 3‑4: Publish prioritized backlog & ownership matrix; Evidence Binder categories.
Wks 5‑8: Automate scans; AI registry + syllabus generator; cyber control mapping.
Wks 9‑10: FVT/GE data prep tasks, program threshold watchlist; draft board packet.
Wks 11‑12: Incident tabletop & accessibility regression drill; finalize executive packet & ROI summary.

### Project Structure
```
edutrustops/
├── package.json
├── tsconfig.json
├── next.config.js
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   ├── accessibility-snapshot/
│   │   │   └── page.tsx
│   │   ├── solutions/
│   │   ├── platform/
│   │   ├── pricing/
│   │   ├── resources/
│   │   ├── trust-center/
│   │   ├── book-a-demo/
│   │   └── api/
│   │       ├── snapshot/route.ts (lead capture for accessibility snapshot)
│   │       ├── bi/token/route.ts (Power BI embed token stub)
│   └── lib/
│       ├── prisma.ts
│       └── stripeHandlers.ts
│       └── sitemap.ts (public sitemap ingestion helper)
├── src/components/Footer.tsx
├── src/rules/ticketing.ts
```

### Running Locally
1. Install dependencies:
```bash
npm install
```
2. Configure environment variables (`.env`).
3. Run Prisma:
```bash
npx prisma generate
npx prisma migrate dev --name init
```
4. Start dev server:
```bash
npm run dev
```

### Deployment (Vercel)
Configure ENV vars, deploy, add Stripe webhook (`/api/stripe/webhook`), map domain & verify SSL.

### Future Enhancements
- Auth & SSO (Clerk/Auth0; SAML for Enterprise)
- Evidence artefact storage (S3) & export service
- Background agents (crawler, control scanner, AI policy engine)
- Trust Score computation microservice
- Notification system (email/Slack)
- Legal & policy pages (Privacy, Terms, DPA, Accessibility Statement)

### License
Proprietary – All rights reserved.
