import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Minimal stub for Power BI (or other BI) embed token generation using symmetric key.
// In production, prefer Azure AD service principal or delegated embed tokens.
export async function GET() {
  const secret = process.env.POWERBI_APP_SECRET;
  if (!secret) return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  const token = jwt.sign({ scope: 'bi:embed', iat: Math.floor(Date.now() / 1000) }, secret, {
    algorithm: 'HS256',
    expiresIn: '10m',
  });
  return NextResponse.json({ token });
}
