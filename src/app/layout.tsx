import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://platform.edutrustops.org'),
  title: 'EduTrustOps™ | Accessibility, Cyber, AI Governance & FVT/GE Operations',
  description: 'Turnkey Trust Operations platform for districts and colleges: ADA Title II accessibility, NIST CSF cyber baseline, AI governance, and FVT/GE program transparency with an audit-ready Evidence Binder.',
  openGraph: {
    title: 'EduTrustOps™ | Trust Operations for Education',
    description: 'Prove accessibility, reduce cyber risk, govern AI, and meet FVT/GE deadlines in one platform.',
    url: 'https://platform.edutrustops.org',
    siteName: 'EduTrustOps',
    locale: 'en_US',
    type: 'website',
    images: ['/og-card.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduTrustOps™ Trust Operations Platform',
    description: 'Accessibility, Cyber, AI Governance, Value Transparency in one system.',
    images: ['/og-card.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'EduTrustOps',
              url: 'https://platform.edutrustops.org',
              description: 'Turnkey Trust Operations for education: accessibility, cyber, AI governance, FVT/GE.',
              sameAs: [],
              productSupported: 'K-12 Districts, Community Colleges, Universities',
            }),
          }}
        />
        <nav style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem 2rem',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <Link href="/" style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            textDecoration: 'none',
            color: 'inherit'
          }}>
            EduTrustOps™
          </Link>
          <div className="nav-links" style={{ 
            display: 'flex', 
            gap: '2rem',
            alignItems: 'center'
          }}>
            <Link href="/solutions" style={{ textDecoration: 'none', color: 'inherit' }}>Solutions</Link>
            <Link href="/platform" style={{ textDecoration: 'none', color: 'inherit' }}>Platform</Link>
            <Link href="/pricing" style={{ textDecoration: 'none', color: 'inherit' }}>Pricing</Link>
            <Link href="/resources" style={{ textDecoration: 'none', color: 'inherit' }}>Resources</Link>
            <Link href="/trust-center" style={{ textDecoration: 'none', color: 'inherit' }}>Trust Center</Link>
            <Link href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Sign In</Link>
            <Link href="/book-a-demo" style={{ 
              padding: '0.5rem 1rem', 
              background: '#4f46e5', 
              color: '#fff', 
              borderRadius: '0.375rem', 
              textDecoration: 'none' 
            }}>
              Book a Demo
            </Link>
          </div>
        </nav>
  <main className="container">{children}</main>
  <Footer />
      </body>
    </html>
  );
}