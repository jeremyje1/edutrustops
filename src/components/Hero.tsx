import Link from 'next/link';
import React from 'react';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-inner">
        <h1 id="hero-heading">
          EduTrustOps™ — the turnkey way for districts and colleges to prove digital accessibility, reduce cyber risk, govern AI, and meet FVT/GE deadlines—with audit‑ready evidence, every day.
        </h1>
        <p className="hero-subhead" role="doc-subtitle">
          Three immovable clocks are here: ADA Title II (WCAG 2.1 AA by 2026/27), FCC K‑12 Cybersecurity Pilot momentum, and new FVT/GE program transparency cycles. Install Trust Operations in 90 days and stay continuously ready.
        </p>
        <div className="clocks-wrapper" aria-describedby="clocks-label">
          <p id="clocks-label" className="sr-only">Regulatory timelines</p>
          <ul className="clock-badges">
            <li><span>ADA Title II: WCAG 2.1 AA 2026/27</span></li>
            <li><span>FCC Cyber Pilot: funded controls</span></li>
            <li><span>FVT/GE: 2025 reporting</span></li>
          </ul>
        </div>
        <div className="cta-buttons" aria-label="Primary actions">
          <Link href="/book-a-demo" className="primary-cta">Book a 15‑Minute Readiness Call</Link>
          <Link href="/evidence-binder" className="secondary">See Evidence Binder Sample</Link>
        </div>
      </div>
    </section>
  );
}
