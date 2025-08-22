"use client";
import { useState } from 'react';

export default function PricingPage() {
  const [loadingTier, setLoadingTier] = useState<string>('');

  const subscribe = async (tier: string) => {
    setLoadingTier(tier);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
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
    <>
      <h1>Pricing</h1>
      <p>
        Set list pricing; discount by cohort (K‑12, community colleges, state systems).
      </p>
      <section style={{ marginTop: '2rem' }}>
        <h2>Core</h2>
        <p className="price-range">$35k–$75k/yr (scale by enrollment/number of sites)</p>
        <p>
          Includes all 4 modules, 1 connector pack, Evidence Binder, quarterly board report.
        </p>
        <button disabled={loadingTier === 'core'} onClick={() => subscribe('core')} style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', borderRadius: '0.375rem', border: 'none' }}>
          {loadingTier === 'core' ? 'Redirecting…' : 'Subscribe to Core'}
        </button>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2>Pro</h2>
        <p className="price-range">$75k–$165k/yr</p>
        <p>
          Multi‑unit, SSO, ticketing sync (Jira/ServiceNow), VPAT/ACR review credits.{' '}
          <a href="https://www.itic.org/" target="_blank" rel="noopener noreferrer">Information Technology Industry Council</a>
        </p>
        <button disabled={loadingTier === 'pro'} onClick={() => subscribe('pro')} style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', borderRadius: '0.375rem', border: 'none' }}>
          {loadingTier === 'pro' ? 'Redirecting…' : 'Subscribe to Pro'}
        </button>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2>Enterprise</h2>
        <p className="price-range">$165k+</p>
        <p>
          Custom connectors, data residency, premium SLA (1‑hr P1).
        </p>
        <button disabled={loadingTier === 'enterprise'} onClick={() => subscribe('enterprise')} style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', borderRadius: '0.375rem', border: 'none' }}>
          {loadingTier === 'enterprise' ? 'Redirecting…' : 'Subscribe to Enterprise'}
        </button>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2>Add‑ons</h2>
        <p>
          PDF remediation blocks; FCC Pilot application support; FVT/GE NSLDS file QA.
        </p>
      </section>
      <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>
        Bill annually; align renewals to measured risk reduction targets.
      </p>
    </>
  );
}