import React from 'react';

interface ModuleDef {
  key: string;
  name: string;
  tagline: string;
  bullets: string[];
}

const MODULES: ModuleDef[] = [
  {
    key: 'accessibility',
    name: 'AccessibilityOps',
    tagline: 'ADA Title II compliance & continuous WCAG 2.1 AA evidence',
    bullets: [
      'Site & LMS crawling with delta snapshots',
      'Issue routing + ownership attestations',
      'VPAT intake & remediation tracking',
      'Exportable Accessibility Evidence Binder'
    ],
  },
  {
    key: 'cyber',
    name: 'CyberOps',
    tagline: 'NIST CSF 2.0 baseline + FCC Pilot alignment',
    bullets: [
      'Control inventory & scoring',
      'MFA / EDR / Backup posture checks',
      'Vendor risk register & renewal alerts',
      'Incident evidence packet templates'
    ],
  },
  {
    key: 'ai',
    name: 'AIGovernanceOps',
    tagline: 'Operationalize AI policy into classrooms & procurement',
    bullets: [
      'Approved tools registry + risk tags',
      'Syllabus & course statement generator',
      'Prompt & data use guardrail attestations',
      'Faculty training & acknowledgement tracking'
    ],
  },
  {
    key: 'value',
    name: 'ValueTransparencyOps',
    tagline: 'FVT/GE mappings & disclosure readiness',
    bullets: [
      'CIP → SOC mapping automation',
      'NSLDS data prep & QA tasks',
      'Program threshold monitoring',
      'Disclosure snippet generator'
    ],
  },
];

export function OpsModules() {
  return (
    <section aria-labelledby="modules-heading" className="ops-modules">
      <h2 id="modules-heading">Trust Operations modules</h2>
      <div className="modules-grid">
        {MODULES.map(m => (
          <article key={m.key} className="module-card" aria-labelledby={`module-${m.key}`}> 
            <h3 id={`module-${m.key}`}>{m.name}</h3>
            <p className="tagline">{m.tagline}</p>
            <ul>
              {m.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
