import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ValueClocks } from '@/components/ValueClocks';
import { OpsModules } from '@/components/OpsModules';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueClocks />
      <OpsModules />
      <section className="proof-strip" aria-label="Compliance frameworks">
        <div className="proof-items">
          <a href="https://www.ada.gov/" target="_blank" rel="noopener noreferrer">ADA Title II</a>
          <span aria-hidden="true">|</span>
          <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer">NIST CSF 2.0</a>
          <span aria-hidden="true">|</span>
          <a href="https://www.fcc.gov/" target="_blank" rel="noopener noreferrer">FCC Pilot</a>
          <span aria-hidden="true">|</span>
          <a href="https://fsapartners.ed.gov/" target="_blank" rel="noopener noreferrer">US ED FVT/GE</a>
        </div>
      </section>
      <section className="final-cta" aria-labelledby="cta-heading">
        <h2 id="cta-heading">Install Trust Operations in 90 Days</h2>
        <p>Baseline accessibility & cyber, operationalize AI governance, and stand up FVT/GE evidence with a single subscription—and export an audit‑ready Evidence Binder anytime.</p>
        <div className="cta-buttons" aria-label="Get started actions">
          <Link href="/book-a-demo" className="primary-cta">Book a Demo</Link>
          <Link href="/accessibility-snapshot" className="secondary">Run a 10‑Page Accessibility Snapshot (Free)</Link>
        </div>
      </section>
    </>
  );
}
