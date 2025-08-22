export default function ResourcesPage() {
  return (
    <>
      <h1>Resources</h1>
      <p>
        Stay informed and prepare your institution with our curated guides and templates.
      </p>
      <section className="resource-grid">
        <article className="resource-card">
          <h2>ADA Title II Quick Guide</h2>
          <p>Understand the new web and app accessibility requirements and compliance deadlines.</p>
          <p className="source">
            <a href="https://www.ada.gov/" target="_blank" rel="noopener noreferrer">ADA.gov</a>
          </p>
        </article>
        
        <article className="resource-card">
          <h2>NIST CSF 2.0 Checklist</h2>
          <p>Assess your cyber posture against the latest framework.</p>
          <p className="source">
            <a href="https://www.nist.gov/cyberframework" target="_blank" rel="noopener noreferrer">NIST Publications</a>
          </p>
        </article>
        
        <article className="resource-card">
          <h2>AI Policy Templates</h2>
          <p>Draft student and faculty use statements and procurement clauses that align with U.S. ED guidance.</p>
          <p className="source">
            <a href="https://www.ed.gov/" target="_blank" rel="noopener noreferrer">U.S. Department of Education</a>
          </p>
        </article>
        
        <article className="resource-card">
          <h2>FVT/GE Timeline Updates</h2>
          <p>Key dates for program‑level disclosures and reporting through 2025.</p>
          <p className="source">
            <a href="https://fsapartners.ed.gov/" target="_blank" rel="noopener noreferrer">FSA Partner Connect</a>
          </p>
        </article>
      </section>
    </>
  );
}
