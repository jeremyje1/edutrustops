-- Test Data Setup for EduTrustOps Customer Flow
-- Run this in Supabase SQL Editor to populate test data

-- 1. Create Test Institution
INSERT INTO institutions (id, name, domain, subscription_tier, settings, created_at, updated_at) VALUES
('test_university_001', 'Example State University', 'example-state.edu', 'PROFESSIONAL', 
 '{"enrollment": 15000, "campus_count": 3, "primary_lms": "Canvas"}', 
 NOW(), NOW());

-- 2. Create Test Admin User
INSERT INTO auth_users (id, email, first_name, last_name, role, institution_id, created_at, updated_at) VALUES
('admin_001', 'admin@example-state.edu', 'Sarah', 'Johnson', 'ADMIN', 'test_university_001', NOW(), NOW());

-- 3. Create Test Evidence Items
INSERT INTO evidence_items (id, institution_id, title, description, category, trust_domain, content, compliance_status, tags, created_by, created_at, updated_at) VALUES
('evidence_001', 'test_university_001', 'Accessibility Policy Document', 'University-wide policy for digital accessibility compliance', 'POLICY', 'ACCESSIBILITY', 'This policy ensures all digital content meets WCAG 2.1 AA standards...', 'COMPLIANT', ARRAY['ADA', 'WCAG', 'policy'], 'admin_001', NOW(), NOW()),
('evidence_002', 'test_university_001', 'Multi-Factor Authentication Implementation', 'MFA deployment across all student and staff accounts', 'PROCEDURE', 'CYBER_SECURITY', 'MFA implementation covers 100% of institutional accounts...', 'COMPLIANT', ARRAY['MFA', 'cybersecurity', 'NIST'], 'admin_001', NOW(), NOW()),
('evidence_003', 'test_university_001', 'AI Usage Guidelines for Faculty', 'Guidelines for responsible AI use in curriculum and assessment', 'POLICY', 'AI_GOVERNANCE', 'Faculty guidelines for ChatGPT, Grammarly, and other AI tools...', 'PARTIAL', ARRAY['AI', 'faculty', 'guidelines'], 'admin_001', NOW(), NOW());

-- 4. Create Test Trust Scores
INSERT INTO trust_scores (id, institution_id, domain, score, calculated_at, metadata) VALUES
('score_001', 'test_university_001', 'ACCESSIBILITY', 78.5, NOW(), '{"last_scan": "2025-08-20", "violations": 23, "pages_scanned": 150}'),
('score_002', 'test_university_001', 'CYBER_SECURITY', 82.3, NOW(), '{"nist_coverage": 85, "controls_implemented": 34, "controls_total": 40}'),
('score_003', 'test_university_001', 'AI_GOVERNANCE', 65.0, NOW(), '{"policies_created": 3, "faculty_trained": 45, "tools_approved": 8}'),
('score_004', 'test_university_001', 'FVT_GE', 91.2, NOW(), '{"programs_compliant": 12, "disclosure_ready": true, "nslds_current": true}');

-- 5. Create Test Accessibility Scan
INSERT INTO accessibility_scans (id, institution_id, url, scan_type, status, accessibility_score, violations_count, warnings_count, results, scan_date, completed_at) VALUES
('scan_001', 'test_university_001', 'https://example-state.edu', 'full_site', 'COMPLETED', 78.5, 23, 45, 
 '{"wcag_aa_issues": 23, "color_contrast": 8, "alt_text": 12, "keyboard_nav": 3}', 
 NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days');

-- 6. Create Test Cyber Assessment
INSERT INTO cyber_assessments (id, institution_id, assessment_type, framework, status, overall_risk_level, completion_percentage, findings, recommendations, created_at, updated_at) VALUES
('cyber_001', 'test_university_001', 'baseline', 'NIST CSF 2.0', 'COMPLETED', 'MEDIUM', 85.0,
 '{"mfa_coverage": 100, "backup_tested": true, "edr_deployed": 90, "vendor_assessments": 12}',
 ARRAY['Implement endpoint detection on remaining 10% of devices', 'Complete vendor risk assessments for 3 critical suppliers', 'Update incident response playbook'],
 NOW() - INTERVAL '1 week', NOW() - INTERVAL '1 week');

-- 7. Create Test AI Governance Items
INSERT INTO ai_governance_items (id, institution_id, ai_system_name, description, risk_category, compliance_framework, compliance_status, review_date, responsible_person, created_at, updated_at) VALUES
('ai_001', 'test_university_001', 'ChatGPT Enterprise', 'University-approved AI assistant for faculty and students', 'MEDIUM', 'University AI Policy v2.1', 'COMPLIANT', NOW() + INTERVAL '6 months', 'Dr. Sarah Johnson', NOW(), NOW()),
('ai_002', 'test_university_001', 'Grammarly Business', 'Writing assistance tool for academic writing', 'LOW', 'University AI Policy v2.1', 'COMPLIANT', NOW() + INTERVAL '1 year', 'Dr. Sarah Johnson', NOW(), NOW()),
('ai_003', 'test_university_001', 'Proctorio AI Monitoring', 'AI-powered exam proctoring system', 'HIGH', 'FERPA Compliance Framework', 'PENDING', NOW() + INTERVAL '3 months', 'IT Security Team', NOW(), NOW());

-- 8. Create Test FVT/GE Items  
INSERT INTO fvt_ge_items (id, institution_id, vendor_name, product_name, contract_number, fvt_status, ge_status, contract_start_date, contract_end_date, annual_spend, risk_assessment, documentation_url, created_at, updated_at) VALUES
('fvt_001', 'test_university_001', 'Canvas by Instructure', 'Canvas LMS Enterprise', 'CNV-2024-001', 'COMPLIANT', 'COMPLIANT', '2024-07-01', '2027-06-30', 450000.00, 'LOW', 'https://example-state.edu/docs/canvas-contract', NOW(), NOW()),
('fvt_002', 'test_university_001', 'Microsoft Corporation', 'Office 365 Education', 'MS-2023-EDU', 'COMPLIANT', 'COMPLIANT', '2023-08-01', '2026-07-31', 280000.00, 'LOW', 'https://example-state.edu/docs/microsoft-agreement', NOW(), NOW()),
('fvt_003', 'test_university_001', 'Pearson Education', 'MyMathLab Platform', 'PRS-2024-MLab', 'PENDING', 'PARTIAL', '2024-01-15', '2025-12-31', 125000.00, 'MEDIUM', 'https://example-state.edu/docs/pearson-review', NOW(), NOW());

-- 9. Create Test Subscription
INSERT INTO subscription_tiers (id, institution_id, tier, features, limits, created_at, updated_at) VALUES
('sub_001', 'test_university_001', 'PROFESSIONAL', 
 '{"evidence_binder": true, "automated_scans": true, "sso_integration": true, "api_access": true, "custom_reporting": true}',
 '{"monthly_scans": 50, "evidence_items": 1000, "user_accounts": 25, "integrations": 5}',
 NOW(), NOW());
