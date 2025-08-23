"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Demo mode - Authentication coming soon');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto', padding: '0 1rem' }}>
      <h1>{isLogin ? 'Sign In' : 'Create Account'}</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        {isLogin 
          ? 'Welcome back! Please sign in to access your dashboard.'
          : 'Start your 30-day free trial of EduTrustOps™'
        }
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {!isLogin && (
          <>
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              required 
              style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}
            />
            <input 
              type="text" 
              name="institution" 
              placeholder="Institution Name" 
              required 
              style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}
            />
          </>
        )}
        
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          required 
          style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}
        />
        
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          required 
          style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}
        />

        {!isLogin && (
          <label style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <input type="checkbox" name="terms" required style={{ marginTop: '0.2rem' }} />
            <span>
              I agree to the <Link href="/trust-center#privacy" style={{ color: '#4f46e5' }}>Privacy Policy</Link> and{' '}
              <Link href="/trust-center#terms" style={{ color: '#4f46e5' }}>Terms of Service</Link>
            </span>
          </label>
        )}

        <button 
          type="submit" 
          style={{ 
            padding: '0.75rem', 
            background: '#4f46e5', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '0.375rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {isLogin ? 'Sign In' : 'Start Free Trial'}
        </button>
      </form>

      {status && (
        <p style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: '#fef3c7', 
          border: '1px solid #fcd34d',
          borderRadius: '0.375rem',
          fontSize: '0.875rem'
        }}>
          {status}
        </p>
      )}

      <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <button 
              onClick={() => setIsLogin(false)}
              style={{ color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button 
              onClick={() => setIsLogin(true)}
              style={{ color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </div>
  );
}
