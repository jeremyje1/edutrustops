export default function SolutionsPage() {
  return (
    <>
      <h1>Solutions</h1>
      <p>Pick the module you need or bundle all four. EduTrustOps™ scales with you.</p>
      
      <section className="solution-module">
        <h2>AccessibilityOps</h2>
        <p className="tagline">"From scan reports to fixed issues and an ADA‑ready public statement."</p>
        <h3>Deliverables:</h3>
        <ul>
          <li>Inventory of pages/files</li>
          <li>Prioritized backlog</li>
          <li>Owner‑routed tickets</li>
          <li>Monthly WCAG scorecards</li>
          <li>VPAT/ACR tracking</li>
          <li>Accessible content playbooks</li>
        </ul>
        <p className="source">
          Sources: <a href="https://www.ada.gov/" target="_blank" rel="noopener noreferrer">ADA.gov</a>,{' '}
          <a href="https://www.itic.org/" target="_blank" rel="noopener noreferrer">Information Technology Industry Council</a>
        </p>
      </section>

      <section className="solution-module">
        <h2>CyberOps</h2>
        <p className="tagline">"Measure once against NIST CSF 2.0; track controls; align spend to the FCC Pilot."</p>
        <h3>Deliverables:</h3>
        <ul>
          <li>MFA/backup/EDR checkpoints</li>
          <li>Vendor risk registry</li>
          <li>Training & attestation runs</li>
          <li>Incident packet templates</li>
        </ul>
        <p className="source">
          Sources: <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer">NIST Publications</a>,{' '}
          <a href="https://www.fcc.gov/" target="_blank" rel="noopener noreferrer">Federal Communications Commission</a>
        </p>
      </section>

      <section className="solution-module">
        <h2>AIGovernanceOps</h2>
        <p className="tagline">"Turn policy into practice."</p>
        <h3>Deliverables:</h3>
        <ul>
          <li>Approved tool registry + risk tags</li>
          <li>Course‑level AI use statements</li>
          <li>Syllabus & procurement clauses aligned to U.S. ED guidance</li>
        </ul>
        <p className="source">
          Source: <a href="https://www.ed.gov/" target="_blank" rel="noopener noreferrer">U.S. Department of Education</a>
        </p>
      </section>

      <section className="solution-module">
        <h2>ValueTransparencyOps</h2>
        <p className="tagline">"Get FVT/GE right—without the scramble."</p>
        <h3>Deliverables:</h3>
        <ul>
          <li>CIP‑to‑SOC mapping</li>
          <li>NSLDS file prep</li>
          <li>Disclosure snippets</li>
          <li>Risk watch for programs near thresholds</li>
        </ul>
        <p className="source">
          Source: <a href="https://fsapartners.ed.gov/" target="_blank" rel="noopener noreferrer">FSA Partner Connect</a>
        </p>
      </section>
    </>
  );
}