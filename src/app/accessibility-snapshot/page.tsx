"use client";
import { useState } from 'react';

export default function AccessibilitySnapshotPage() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('/api/snapshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('Snapshot request received. We will email results shortly.');
        (e.currentTarget as any).reset();
      } else {
        setStatus('Submission failed. Please try again.');
      }
    } catch {
      setStatus('Network error.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h1>Free 10‑Page Accessibility Snapshot</h1>
      <p>Provide a base URL and we will crawl up to 10 pages (homepage + discovered internal links) and send you a brief findings summary with top issues and fixes aligned to WCAG 2.1 AA (ADA Title II readiness).</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 520 }}>
        <input name="name" type="text" placeholder="Name" required />
        <input name="email" type="email" placeholder="Work Email" required />
        <input name="institution" type="text" placeholder="Institution" />
        <input name="baseUrl" type="url" placeholder="Public Site URL (https://...)" required aria-describedby="url-help" />
        <p id="url-help" style={{ fontSize: '0.8rem', marginTop: '-0.5rem' }}>We only perform read‑only, polite requests; no form submissions.</p>
        <label style={{ fontSize: '0.8rem' }}>
          <input type="checkbox" name="consent" value="true" required /> I consent to processing per the Privacy Policy.
        </label>
        <button type="submit" disabled={loading} style={{ padding: '0.75rem 1.5rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6 }}>
          {loading ? 'Submitting…' : 'Request Snapshot'}
        </button>
      </form>
  {status && <output aria-live="polite">{status}</output>}
      <p style={{ marginTop: '2rem', fontSize: '0.75rem' }}>By requesting, you acknowledge this limited sample is informational and not a certification of compliance.</p>
    </>
  );
}
