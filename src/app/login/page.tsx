"use client";
import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/platform`,
            data: {
              full_name: name,
              institution: institution,
            }
          }
        });
        
        if (error) throw error;
        
        if (data.user && !data.user.email_confirmed_at) {
          setMessage('Check your email for the confirmation link!');
        } else {
          setMessage('Account created successfully!');
          router.push('/platform');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        setMessage('Signed in successfully!');
        router.push('/platform');
      }
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto', padding: '0 1rem' }}>
      <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
        {isSignUp 
          ? 'Start your journey with EduTrustOps™'
          : 'Welcome back! Please sign in to access your dashboard.'
        }
      </p>

      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {isSignUp && (
          <>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}
            />
            <input 
              type="text" 
              placeholder="Institution Name" 
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required 
              style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}
            />
          </>
        )}
        
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}
        />

        {isSignUp && (
          <label style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <input type="checkbox" required style={{ marginTop: '0.2rem' }} />
            <span>
              I agree to the <Link href="/trust-center#privacy" style={{ color: '#4f46e5' }}>Privacy Policy</Link> and{' '}
              <Link href="/trust-center#terms" style={{ color: '#4f46e5' }}>Terms of Service</Link>
            </span>
          </label>
        )}

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '0.75rem', 
            background: loading ? '#9ca3af' : '#4f46e5', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '0.375rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
        </button>
      </form>

      {message && (
        <p style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: message.includes('successfully') || message.includes('Check your email') ? '#d1fae5' : '#fef2f2', 
          border: `1px solid ${message.includes('successfully') || message.includes('Check your email') ? '#10b981' : '#ef4444'}`,
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          color: message.includes('successfully') || message.includes('Check your email') ? '#065f46' : '#991b1b'
        }}>
          {message}
        </p>
      )}

      <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
        {isSignUp ? (
          <>
            Already have an account?{' '}
            <button 
              onClick={() => {
                setIsSignUp(false);
                setMessage('');
              }}
              style={{ color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Sign in
            </button>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <button 
              onClick={() => {
                setIsSignUp(true);
                setMessage('');
              }}
              style={{ color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Sign up
            </button>
          </>
        )}
      </p>
    </div>
  );
}
