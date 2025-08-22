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
        <nav>
          <Link href="/">EduTrustOps</Link>
          <div className="nav-links">
            <Link href="/solutions">Solutions</Link>
            <Link href="/platform">Platform</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/trust-center">Trust Center</Link>
            <Link href="/book-a-demo">Book a Demo</Link>
          </div>
        </nav>
  <main className="container">{children}</main>
  <Footer />
      </body>
    </html>
  );
}