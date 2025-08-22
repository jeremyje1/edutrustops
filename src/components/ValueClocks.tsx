import React from 'react';

const CLOCKS: { title: string; detail: string; source: string; href: string }[] = [
  {
    title: 'ADA Title II',
    detail: 'Public entities must align web & mobile content to WCAG 2.1 AA (2026/27 phased deadlines).',
    source: 'ADA.gov',
    href: 'https://www.ada.gov/'
  },
  {
    title: 'FCC Cyber Pilot',
    detail: 'Cybersecurity controls (EDR, MFA, monitoring) now eligible for funded pilots – elevating baseline expectations.',
    source: 'FCC / Federal Register',
    href: 'https://www.fcc.gov/'
  },
  {
    title: 'FVT / GE',
    detail: 'Program‑level value & earnings transparency and GE metrics tighten disclosure & evidence cycles (2025).',
    source: 'FSA Partner Connect',
    href: 'https://fsapartners.ed.gov/'
  },
];

export function ValueClocks() {
  return (
    <section aria-labelledby="clocks-heading" className="value-clocks">
      <h2 id="clocks-heading">Why now: three immovable clocks</h2>
      <div className="clock-grid">
        {CLOCKS.map(c => (
          <article key={c.title} className="clock-card" aria-labelledby={`clock-${c.title}`}>
            <h3 id={`clock-${c.title}`}>{c.title}</h3>
            <p>{c.detail}</p>
            <p className="source"><a href={c.href} target="_blank" rel="noopener noreferrer">Source: {c.source}</a></p>
          </article>
        ))}
      </div>
    </section>
  );
}
