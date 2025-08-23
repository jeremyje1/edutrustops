# Supabase Setup Instructions for EduTrustOps

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Choose a name like "edutrustops-prod" or "edutrustops-dev"
3. Select a region close to your users
4. Note your project URL and anon key from Settings > API

## 2. Configure Environment Variables

Add these to your Vercel project and local `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Database Connection (for Prisma migrations)
DATABASE_URL="postgresql://postgres:your-password@db.your-project-id.supabase.co:5432/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:your-password@db.your-project-id.supabase.co:5432/postgres"
```

## 3. Run Database Migration

```bash
# Generate and apply the new schema
npm run db:migrate:dev

# Or manually run:
npx prisma migrate dev --name init
```

## 4. Set Up Row Level Security

1. Open Supabase Dashboard > SQL Editor
2. Copy and paste the contents of `supabase/rls-setup.sql`
3. Run the script to enable RLS and create policies

## 5. Configure Authentication

In Supabase Dashboard > Authentication > Settings:

1. **Site URL**: `https://platform.edutrustops.org`
2. **Redirect URLs**: Add all your domains:
   - `https://platform.edutrustops.org/**`
   - `https://edutrustops.vercel.app/**`
   - `http://localhost:3000/**`

3. **Email Templates**: Customize for your branding

4. **Auth Providers**: Enable desired providers (Google, Microsoft, etc.)

## 6. Import Existing Data (if any)

If you have existing institution data:

```sql
-- Example: Create initial institutions
INSERT INTO institutions (id, name, domain, subscription_tier, settings) VALUES
('inst_1', 'Example University', 'example.edu', 'ENTERPRISE', '{}'),
('inst_2', 'Test College', 'test.edu', 'PROFESSIONAL', '{}');

-- Create initial admin users
INSERT INTO auth_users (id, email, role, institution_id, supabase_id) VALUES
('user_1', 'admin@example.edu', 'ADMIN', 'inst_1', 'supabase-user-id-here'),
('user_2', 'admin@test.edu', 'ADMIN', 'inst_2', 'supabase-user-id-here');
```

## 7. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/login` to test authentication
3. Check that user sessions persist across page loads
4. Verify RLS is working by trying to access other institutions' data

## 8. Production Deployment

1. Add all environment variables to Vercel
2. Deploy the updated application
3. Test authentication flows on production domain
4. Monitor logs for any authentication issues

## Key Features Enabled

- ✅ Multi-tenant row-level security
- ✅ Institution-based data isolation
- ✅ Role-based access control (VIEWER, USER, ADMIN, SUPER_ADMIN)
- ✅ Real-time subscriptions for live updates
- ✅ Comprehensive audit trail
- ✅ Education compliance tracking
- ✅ Trust score calculations
- ✅ Evidence management system

## Troubleshooting

### Migration Issues
```bash
# Reset and retry migration
npx prisma migrate reset --force
npx prisma migrate dev --name init
```

### RLS Policy Issues
- Check user is properly authenticated
- Verify `institution_id` is set correctly
- Test policies in Supabase SQL Editor

### Authentication Issues
- Verify environment variables are set
- Check redirect URLs match exactly
- Ensure middleware is properly configured

## Next Steps

After basic setup:
1. Implement user invitation system
2. Add SSO integration for education providers
3. Set up automated trust score calculations
4. Configure real-time notifications
5. Add comprehensive audit logging
