"use client";
import { useState } from 'react';

interface PricingTier {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  enrollment: string;
  features: string[];
  highlighted?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: 'Core',
    monthlyPrice: 4999,
    annualPrice: 49990,
    enrollment: 'Up to 5,000 students',
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
    name: 'Pro',
    monthlyPrice: 9999,
    annualPrice: 99990,
    enrollment: 'Up to 20,000 students',
    highlighted: true,
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
    name: 'Enterprise',
    monthlyPrice: 16999,
    annualPrice: 169990,
    enrollment: 'Unlimited students',
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

const addOns = [
  { name: 'PDF Remediation Credits', price: '$99/document', description: '508-compliant PDF remediation' },
  { name: 'FCC Pilot Application Support', price: '$4,999', description: 'Complete application assistance' },
  { name: 'FVT/GE NSLDS File QA', price: '$2,499/review', description: 'Pre-submission validation' },
  { name: 'Emergency Response', price: '$999/incident', description: '24/7 crisis support' },
];

export default function PricingPage() {
  const [loadingTier, setLoadingTier] = useState<string>('');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');

  // Fixed fragment navigation for pricing tiers

  const subscribe = async (tier: string) => {
    setLoadingTier(tier);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: tier.toLowerCase(), billing: billingPeriod }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
      } else {
        alert('Failed to create checkout session.');
      }
    } catch (err) {
      alert('Network error while creating checkout session.');
    } finally {
      setLoadingTier('');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Transparent, value-based pricing</h1>
      <p style={{ textAlign: 'center', fontSize: '1.125rem', color: '#6b7280', marginBottom: '3rem' }}>
        Purpose-built for education. Save 17% with annual billing. Special rates for consortiums.
      </p>
      
      {/* Billing Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', background: '#f3f4f6', borderRadius: '0.5rem', padding: '0.25rem' }}>
          <button
            onClick={() => setBillingPeriod('monthly')}
            style={{
              padding: '0.5rem 1.5rem',
              background: billingPeriod === 'monthly' ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: '0.375rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            style={{
              padding: '0.5rem 1.5rem',
              background: billingPeriod === 'annual' ? '#fff' : 'transparent',
              border: 'none',
              borderRadius: '0.375rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Annual <span style={{ color: '#10b981', fontSize: '0.875rem' }}>Save 17%</span>
          </button>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {tiers.map((tier) => {
          const price = billingPeriod === 'monthly' ? tier.monthlyPrice : Math.floor(tier.annualPrice / 12);
          const isLoading = loadingTier === tier.name.toLowerCase();
          
          return (
            <div
              key={tier.name}
              id={tier.name.toLowerCase()}
              style={{
                border: tier.highlighted ? '2px solid #4f46e5' : '1px solid #e5e7eb',
                borderRadius: '1rem',
                padding: '2rem',
                position: 'relative',
                background: '#fff',
                boxShadow: tier.highlighted ? '0 20px 25px -5px rgba(0, 0, 0, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            >
              {tier.highlighted && (
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#4f46e5',
                  color: '#fff',
                  padding: '0.25rem 1rem',
                  borderRadius: '9999px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                }}>
                  MOST POPULAR
                </div>
              )}
              
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{tier.name}</h2>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>{tier.enrollment}</p>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '3rem', fontWeight: '700' }}>${price.toLocaleString()}</span>
                <span style={{ color: '#6b7280' }}>/month</span>
                {billingPeriod === 'annual' && (
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    ${tier.annualPrice.toLocaleString()} billed annually
                  </div>
                )}
              </div>
              
              <button
                onClick={() => subscribe(tier.name)}
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: tier.highlighted ? '#4f46e5' : '#1f2937',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  cursor: isLoading ? 'wait' : 'pointer',
                  opacity: isLoading ? 0.7 : 1,
                  marginBottom: '1.5rem',
                }}
              >
                {isLoading ? 'Redirecting...' : `Get Started with ${tier.name}`}
              </button>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {tier.features.map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <svg
                      style={{ width: '20px', height: '20px', marginRight: '0.5rem', flexShrink: 0, color: '#10b981' }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{ fontSize: '0.875rem', color: feature.startsWith('Everything') ? '#000' : '#4b5563' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Add-ons Section */}
      <section id="add-ons" style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Power-ups & Add-ons</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {addOns.map((addon) => (
            <div key={addon.name} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              background: '#fafafa',
            }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{addon.name}</h3>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>{addon.description}</p>
              <p style={{ fontWeight: '600', color: '#4f46e5' }}>{addon.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ / Details */}
      <section id="details" style={{ background: '#f9fafb', padding: '3rem 2rem', borderRadius: '1rem' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Pricing Details</h2>
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Volume Discounts</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              State systems and consortiums receive 20-30% off. Contact us for custom quotes over 50,000 students.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>Implementation</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              All plans include 90-day implementation with dedicated onboarding specialist. Go live in weeks, not months.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>No Hidden Fees</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Transparent pricing includes all platform features, updates, and standard integrations. Pay only for what you use.
            </p>
          </div>
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          Questions about pricing? Need a custom quote?
        </p>
        <a
          href="/book-a-demo"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: '#fff',
            border: '2px solid #4f46e5',
            color: '#4f46e5',
            borderRadius: '0.5rem',
            fontWeight: '600',
            textDecoration: 'none',
          }}
        >
          Talk to Sales
        </a>
      </div>
    </div>
  );
}