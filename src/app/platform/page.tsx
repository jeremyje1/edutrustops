export default function PlatformPage() {
  return (
    <>
      <h1>Platform</h1>
      <p>
        Behind EduTrustOps™ is a secure, multi‑tenant platform that connects to your existing systems, runs continuous checks and compiles evidence. Here’s what powers your Trust Operations.
      </p>
      <h2>Connectors</h2>
      <p>
        Read‑only integrations with your web sites, LMS (Canvas), document libraries (SharePoint/Drive), SIS and HR, security stack (IdP, EDR, SIEM) and reporting systems (NSLDS). Our connectors never modify data and respect your privacy obligations.
      </p>
      <h2>Rules Engine</h2>
      <p>
        A configurable rules engine maps regulatory requirements to specific checks and evidence. Each agent knows exactly what to collect and how to score it.
      </p>
      <h2>Evidence Binder</h2>
      <p>
        All artefacts—screenshots, VPATs, attestations, policy statements, meeting minutes—are timestamped and organized by requirement. Export to PDF or HTML on demand.
      </p>
      <h2>Dashboards</h2>
      <p>
        Executive, program, web/LMS and CISO dashboards roll up your Trust Score and surface trends. Power BI embed provides rich charts and drill‑downs without leaving the platform.
      </p>
      
      <section className="platform-feature">
        <h2>APIs & SSO</h2>
        <p>OIDC/SAML</p>
        <p>
          Enterprise‑grade authentication with OIDC and SAML support. RESTful APIs for custom integrations.
        </p>
      </section>

      <p className="security-note">
        <strong>Security & Compliance:</strong> We highlight strict RBAC, row‑level security (RLS), encryption, and FERPA/GLBA‑aware data handling.{' '}
        <a href="https://studentprivacy.ed.gov/" target="_blank" rel="noopener noreferrer">Protecting Student Privacy</a>,{' '}
        <a href="https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act" target="_blank" rel="noopener noreferrer">Federal Trade Commission</a>
      </p>
    </>
  );
}