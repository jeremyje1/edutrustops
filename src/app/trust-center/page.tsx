export default function TrustCenterPage() {
  return (
    <>
      <h1>Trust Center</h1>
      <p>Our commitment: security, privacy, accessibility, and transparency baked into the platform. Below are living summaries (not legal advice) of our controls and policies. Contact us for signed copies (DPA, Subprocessors, Accessibility Statement).</p>
      <section id="security" aria-labelledby="security-heading">
        <h2 id="security-heading">Security</h2>
        <ul>
          <li>Encryption: TLS 1.2+ in transit; AES‑256 at rest (database & evidence storage).</li>
          <li>Backups & DR: Daily encrypted snapshots; tested restorations; multi‑AZ.</li>
          <li>Access Control: Principle of least privilege; planned RBAC + row‑level security for tenant data.</li>
          <li>Logging & Monitoring: Centralized logs; anomaly review; incident response runbook.</li>
          <li>Vulnerability Management: Dependency scanning & monthly review cadence.</li>
        </ul>
      </section>
      <section id="privacy" aria-labelledby="privacy-heading">
        <h2 id="privacy-heading">Privacy</h2>
        <p>We minimize personal data. Default ingestion excludes student records unless explicitly enabled. Data Processing Addendum aligns with FERPA, GLBA Safeguards, COPPA (where applicable) and outlines subprocessors and retention.</p>
        <ul>
          <li>Data Minimization: Only metadata & evidence required for compliance scoring.</li>
          <li>Retention: Default 36 months rolling; configurable earlier purge per tenant.</li>
          <li>Subprocessors: Cloud hosting, database, error monitoring, payment (Stripe). Full list available upon request.</li>
          <li>User Rights: Export & deletion upon verified administrator request.</li>
        </ul>
      </section>
      <section id="accessibility" aria-labelledby="accessibility-heading">
        <h2 id="accessibility-heading">Accessibility</h2>
        <p>We target WCAG 2.1 AA conformance across web UI components; continuous internal scans & manual reviews. Alternate format or accommodation requests: <a href="mailto:accessibility@edutrustops.org">accessibility@edutrustops.org</a>.</p>
        <ul>
          <li>Testing: Automated axe checks + manual keyboard & screen reader spot tests.</li>
          <li>Statement: Public Accessibility Statement includes feedback channel & remediation policy.</li>
          <li>Color & Contrast: Palette verified for minimum ratios; exceptions logged.</li>
        </ul>
      </section>
      <section id="compliance" aria-labelledby="compliance-heading">
        <h2 id="compliance-heading">Compliance Artifacts</h2>
        <ul>
          <li>Data Processing Addendum (FERPA / GLBA / COPPA references)</li>
          <li>Privacy Policy & Subprocessor List</li>
          <li>Accessibility Statement (WCAG 2.1 AA target)</li>
          <li>Security Overview & Incident Response Summary</li>
          <li>Data Retention & Deletion Policy</li>
        </ul>
        <p>Need a specific artifact? <a href="mailto:trust@edutrustops.org">trust@edutrustops.org</a></p>
      </section>
    </>
  );
}
