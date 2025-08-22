"use client";
import { useState } from 'react';

export default function BookDemoPage() {
  const [status, setStatus] = useState<string>('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('Thank you! We will be in touch shortly.');
        (e.currentTarget as any).reset();
      } else {
        const err = await res.text();
        setStatus(err || 'Something went wrong.');
      }
    } catch (error) {
      setStatus('Network error.');
    }
  };
  return (
    <>
      <h1>Book a Demo</h1>
      <p>
        Ready to see EduTrustOps™ in action? Fill out the form below and a member of our team will contact you to schedule a demo and run a free 10‑page accessibility snapshot.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
        <input type="text" name="name" placeholder="Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="text" name="institution" placeholder="Institution" />
        <textarea name="message" placeholder="Tell us about your institution" rows={4} />
        <label style={{ fontSize: '0.8rem' }}>
          <input type="checkbox" name="consent" value="true" required /> I consent to the processing of my data in accordance with the Privacy Policy.
        </label>
        <button type="submit" style={{ padding: '0.75rem 1.5rem', background: '#4f46e5', color: '#fff', borderRadius: '0.375rem', border: 'none' }}>Submit</button>
      </form>
      {status && <p>{status}</p>}
    </>
  );
}