import Link from 'next/link';
import React from 'react';

export function Footer() {
  return (
    <footer role="contentinfo" className="site-footer" style={{ marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid #e5e7eb', fontSize: '0.85rem' }}>
      <div className="footer-inner" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <strong>EduTrustOps™</strong>
          <p style={{ maxWidth: 260 }}>Trust Operations for education: accessibility, cyber, AI governance, FVT/GE evidence.</p>
        </div>
        <div>
          <h2 style={{ fontSize: '0.9rem' }}>Product</h2>
          <ul>
            <li><Link href="/solutions">Solutions</Link></li>
            <li><Link href="/platform">Platform</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h2 style={{ fontSize: '0.9rem' }}>Company</h2>
          <ul>
            <li><Link href="/trust-center">Trust Center</Link></li>
            <li><Link href="/book-a-demo">Book a Demo</Link></li>
            <li><Link href="/accessibility-snapshot">Accessibility Snapshot</Link></li>
          </ul>
        </div>
        <div>
          <h2 style={{ fontSize: '0.9rem' }}>Legal & Policies</h2>
          <ul>
            <li><Link href="/trust-center#privacy">Privacy</Link></li>
            <li><Link href="/trust-center#security">Security</Link></li>
            <li><Link href="/trust-center#accessibility">Accessibility</Link></li>
          </ul>
        </div>
      </div>
      <p style={{ marginTop: '1.5rem' }}>© {new Date().getFullYear()} EduTrustOps. All rights reserved.</p>
    </footer>
  );
}
