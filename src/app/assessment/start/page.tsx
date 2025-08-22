type SP = { searchParams?: Record<string, string | string[] | undefined> };

const baseFeatures = [
  'All 4 Ops Modules',
  'Evidence Binder (baseline)',
  'Quarterly board report',
];

const proOnly = [
  'Multi‑org',
  'SSO',
  'Ticketing sync',
  'VPAT credits',
];

const enterpriseOnly = [
  'Advanced integrations',
  'Residency options',
  'Premium SLA',
];

function featuresForTier(tier: string) {
  if (tier === 'enterprise') return [...baseFeatures, ...proOnly, ...enterpriseOnly];
  if (tier === 'pro') return [...baseFeatures, ...proOnly];
  return baseFeatures; // core
}

export default function AssessmentStart({ searchParams }: SP) {
  const tier = (searchParams?.tier as string) || 'core';
  const features = featuresForTier(tier);
  return (
    <main style={{ maxWidth: 860, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Assessment unlocked</h1>
      <p style={{ marginTop: 8 }}>
        Your <strong>{tier.toUpperCase()}</strong> plan is active. The following capabilities are available now:
      </p>
      <ul style={{ marginTop: 16 }}>
        {features.map(f => (
          <li key={f} style={{ marginBottom: 6 }}>{f}</li>
        ))}
      </ul>
      <div style={{ marginTop: 24 }}>
        <a
          href="/"
          style={{ padding: '10px 14px', border: '1px solid #e5e7eb', borderRadius: 6, textDecoration: 'none' }}
        >
          Go to Dashboard
        </a>
      </div>
    </main>
  );
}
