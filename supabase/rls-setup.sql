-- Supabase Row Level Security (RLS) Setup for EduTrustOps
-- Run this after your Prisma migrations in Supabase SQL Editor

-- Enable RLS on all tenant-scoped tables
ALTER TABLE institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE auth_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE accessibility_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE cyber_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_governance_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE fvt_ge_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_tiers ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's institution_id
CREATE OR REPLACE FUNCTION get_user_institution_id()
RETURNS TEXT AS $$
BEGIN
  RETURN (
    SELECT institution_id 
    FROM auth_users 
    WHERE supabase_id = auth.uid()::text
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Institution policies
CREATE POLICY "Users can view their own institution" ON institutions
  FOR SELECT USING (id = get_user_institution_id());

CREATE POLICY "Super admins can view all institutions" ON institutions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth_users 
      WHERE supabase_id = auth.uid()::text 
      AND role = 'SUPER_ADMIN'
    )
  );

-- Auth users policies
CREATE POLICY "Users can view users in their institution" ON auth_users
  FOR SELECT USING (institution_id = get_user_institution_id());

CREATE POLICY "Admins can manage users in their institution" ON auth_users
  FOR ALL USING (
    institution_id = get_user_institution_id() 
    AND EXISTS (
      SELECT 1 FROM auth_users 
      WHERE supabase_id = auth.uid()::text 
      AND role IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

-- Trust scores policies
CREATE POLICY "Users can view their institution's trust scores" ON trust_scores
  FOR SELECT USING (institution_id = get_user_institution_id());

CREATE POLICY "System can insert trust scores" ON trust_scores
  FOR INSERT WITH CHECK (true); -- Controlled by application logic

-- Evidence items policies
CREATE POLICY "Users can view their institution's evidence" ON evidence_items
  FOR SELECT USING (institution_id = get_user_institution_id());

CREATE POLICY "Users can manage their institution's evidence" ON evidence_items
  FOR ALL USING (institution_id = get_user_institution_id());

-- Accessibility scans policies
CREATE POLICY "Users can view their institution's scans" ON accessibility_scans
  FOR SELECT USING (institution_id = get_user_institution_id());

CREATE POLICY "Users can manage their institution's scans" ON accessibility_scans
  FOR ALL USING (institution_id = get_user_institution_id());

-- Cyber assessments policies
CREATE POLICY "Users can view their institution's cyber assessments" ON cyber_assessments
  FOR SELECT USING (institution_id = get_user_institution_id());

CREATE POLICY "Admins can manage cyber assessments" ON cyber_assessments
  FOR ALL USING (
    institution_id = get_user_institution_id() 
    AND EXISTS (
      SELECT 1 FROM auth_users 
      WHERE supabase_id = auth.uid()::text 
      AND role IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

-- AI governance policies
CREATE POLICY "Users can view their institution's AI governance" ON ai_governance_items
  FOR SELECT USING (institution_id = get_user_institution_id());

CREATE POLICY "Users can manage their institution's AI governance" ON ai_governance_items
  FOR ALL USING (institution_id = get_user_institution_id());

-- FVT/GE policies
CREATE POLICY "Users can view their institution's FVT/GE data" ON fvt_ge_items
  FOR SELECT USING (institution_id = get_user_institution_id());

CREATE POLICY "Admins can manage FVT/GE data" ON fvt_ge_items
  FOR ALL USING (
    institution_id = get_user_institution_id() 
    AND EXISTS (
      SELECT 1 FROM auth_users 
      WHERE supabase_id = auth.uid()::text 
      AND role IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

-- Subscription tiers policies
CREATE POLICY "Users can view their institution's subscription" ON subscription_tiers
  FOR SELECT USING (institution_id = get_user_institution_id());

CREATE POLICY "Admins can manage subscription" ON subscription_tiers
  FOR ALL USING (
    institution_id = get_user_institution_id() 
    AND EXISTS (
      SELECT 1 FROM auth_users 
      WHERE supabase_id = auth.uid()::text 
      AND role IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_auth_users_supabase_id ON auth_users(supabase_id);
CREATE INDEX IF NOT EXISTS idx_auth_users_institution_id ON auth_users(institution_id);
CREATE INDEX IF NOT EXISTS idx_evidence_items_institution_id ON evidence_items(institution_id);
CREATE INDEX IF NOT EXISTS idx_evidence_items_category ON evidence_items(category);
CREATE INDEX IF NOT EXISTS idx_trust_scores_institution_id ON trust_scores(institution_id);
CREATE INDEX IF NOT EXISTS idx_accessibility_scans_institution_id ON accessibility_scans(institution_id);

-- Create full-text search for evidence content
CREATE INDEX IF NOT EXISTS idx_evidence_content_search ON evidence_items USING gin(to_tsvector('english', content));

-- Function to automatically set institution_id from current user context
CREATE OR REPLACE FUNCTION set_current_user_institution()
RETURNS TRIGGER AS $$
BEGIN
  NEW.institution_id = get_user_institution_id();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply auto-institution trigger to relevant tables
CREATE TRIGGER set_evidence_institution 
  BEFORE INSERT ON evidence_items 
  FOR EACH ROW 
  WHEN (NEW.institution_id IS NULL)
  EXECUTE FUNCTION set_current_user_institution();

CREATE TRIGGER set_scan_institution 
  BEFORE INSERT ON accessibility_scans 
  FOR EACH ROW 
  WHEN (NEW.institution_id IS NULL)
  EXECUTE FUNCTION set_current_user_institution();
