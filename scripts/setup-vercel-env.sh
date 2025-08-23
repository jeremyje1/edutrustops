#!/bin/bash

# EduTrustOps Vercel Environment Setup
# Run this script after getting your database password from Supabase dashboard

echo "🚀 Setting up Vercel environment variables for EduTrustOps..."

# Prompt for database password
read -s -p "Enter your Supabase database password: " DB_PASSWORD
echo

# Set Supabase environment variables
echo "📡 Setting Supabase configuration..."
vercel env add NEXT_PUBLIC_SUPABASE_URL https://pqugtxjutiswgemjyuch.supabase.co production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxdWd0eGp1dGlzd2dlbWp5dWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5ODI5NTMsImV4cCI6MjA3MTU1ODk1M30.y1f8g6U2icHuah6V8a3AgvZzhkW0SReROwyxPIvfQdk production

# Set database URLs
echo "🗄️ Setting database configuration..."
vercel env add DATABASE_URL "postgresql://postgres:${DB_PASSWORD}@db.pqugtxjutiswgemjyuch.supabase.co:5432/postgres?pgbouncer=true" production
vercel env add DIRECT_URL "postgresql://postgres:${DB_PASSWORD}@db.pqugtxjutiswgemjyuch.supabase.co:5432/postgres" production

# Set domain configuration
echo "🌐 Setting domain configuration..."
vercel env add NEXT_PUBLIC_BASE_URL https://platform.edutrustops.org production
vercel env add CANONICAL_HOST platform.edutrustops.org production
vercel env add FALLBACK_HOST edutrustops.vercel.app production

echo "✅ Environment variables set! Now run:"
echo "   vercel --prod"
echo "   to deploy your application with Supabase integration."

echo ""
echo "📋 Next steps:"
echo "1. Copy and run the RLS setup SQL in Supabase SQL Editor"
echo "2. Configure authentication settings in Supabase dashboard"
echo "3. Test the application locally with: npm run dev"
echo "4. Deploy to production with: vercel --prod"
