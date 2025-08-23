import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '4rem 1rem', 
      minHeight: '50vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link 
          href="/" 
          style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#4f46e5', 
            color: '#fff', 
            borderRadius: '0.375rem', 
            textDecoration: 'none' 
          }}
        >
          Go to Homepage
        </Link>
        <Link 
          href="/book-a-demo" 
          style={{ 
            padding: '0.75rem 1.5rem', 
            border: '1px solid #e5e7eb', 
            borderRadius: '0.375rem', 
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          Book a Demo
        </Link>
      </div>
    </div>
  );
}
