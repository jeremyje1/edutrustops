import Link from 'next/link';

export default function EvidenceBinderPage() {
  return (
    <>
      <h1>Evidence Binder Sample</h1>
      <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
        The EduTrustOps™ Evidence Binder automatically compiles all compliance artifacts into an organized, 
        audit-ready package. Here's what a typical binder includes:
      </p>

      <div style={{ background: '#f9fafb', padding: '2rem', borderRadius: '0.75rem', marginBottom: '3rem' }}>
        <h2 style={{ marginTop: 0 }}>📋 Table of Contents</h2>
        <ol style={{ lineHeight: '1.8' }}>
          <li><strong>Executive Summary</strong> - Trust Score overview and compliance status</li>
          <li><strong>Accessibility Evidence</strong> - WCAG scan reports, VPAT documentation, remediation logs</li>
          <li><strong>Cyber Security Evidence</strong> - NIST CSF assessment, control implementations, training records</li>
          <li><strong>AI Governance Evidence</strong> - Approved tools registry, usage policies, risk assessments</li>
          <li><strong>FVT/GE Evidence</strong> - Program mappings, disclosure tracking, threshold monitoring</li>
          <li><strong>Appendices</strong> - Policies, attestations, meeting minutes, change logs</li>
        </ol>
      </div>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Sample Evidence Types</h2>
        
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <h3 style={{ marginTop: 0, color: '#4f46e5' }}>🔍 Automated Scans</h3>
            <ul style={{ marginBottom: 0 }}>
              <li>WCAG 2.1 AA compliance reports</li>
              <li>Security vulnerability assessments</li>
              <li>Content accessibility checks</li>
              <li>Third-party tool audits</li>
            </ul>
          </div>

          <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <h3 style={{ marginTop: 0, color: '#4f46e5' }}>📄 Documentation</h3>
            <ul style={{ marginBottom: 0 }}>
              <li>Policy statements</li>
              <li>Training completion records</li>
              <li>Incident response logs</li>
              <li>Remediation timelines</li>
            </ul>
          </div>

          <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
            <h3 style={{ marginTop: 0, color: '#4f46e5' }}>✅ Attestations</h3>
            <ul style={{ marginBottom: 0 }}>
              <li>Department head sign-offs</li>
              <li>Vendor compliance certificates</li>
              <li>Staff training acknowledgments</li>
              <li>Control implementation confirmations</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ background: '#eef2ff', padding: '2rem', borderRadius: '0.75rem', textAlign: 'center' }}>
        <h2>Ready to Generate Your Evidence Binder?</h2>
        <p style={{ fontSize: '1.125rem', marginBottom: '2rem' }}>
          Start with a free accessibility snapshot to see how EduTrustOps™ automatically 
          collects and organizes your compliance evidence.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/accessibility-snapshot" style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#4f46e5', 
            color: '#fff', 
            borderRadius: '0.375rem', 
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Get Free Snapshot
          </Link>
          <Link href="/book-a-demo" style={{ 
            padding: '0.75rem 1.5rem', 
            border: '1px solid #4f46e5',
            color: '#4f46e5',
            borderRadius: '0.375rem', 
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            See Full Demo
          </Link>
        </div>
      </section>
    </>
  );
}
