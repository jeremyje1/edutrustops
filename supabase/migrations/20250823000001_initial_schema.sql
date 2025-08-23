-- CreateEnum for UserRole
CREATE TYPE "UserRole" AS ENUM ('VIEWER', 'USER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum for SubscriptionTier
CREATE TYPE "SubscriptionTier" AS ENUM ('FREE', 'PROFESSIONAL', 'ENTERPRISE');

-- CreateEnum for TrustDomain
CREATE TYPE "TrustDomain" AS ENUM ('ACCESSIBILITY', 'CYBER_SECURITY', 'AI_GOVERNANCE', 'FVT_GE');

-- CreateEnum for EvidenceCategory
CREATE TYPE "EvidenceCategory" AS ENUM ('POLICY', 'PROCEDURE', 'ASSESSMENT', 'TRAINING', 'AUDIT', 'CERTIFICATION', 'INCIDENT_RESPONSE');

-- CreateEnum for ComplianceStatus
CREATE TYPE "ComplianceStatus" AS ENUM ('COMPLIANT', 'NON_COMPLIANT', 'PARTIAL', 'PENDING', 'NOT_ASSESSED');

-- CreateEnum for ScanStatus
CREATE TYPE "ScanStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED');

-- CreateEnum for AssessmentStatus
CREATE TYPE "AssessmentStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE');

-- CreateEnum for RiskLevel
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateTable
CREATE TABLE "institutions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT,
    "logo_url" TEXT,
    "subscription_tier" "SubscriptionTier" NOT NULL DEFAULT 'FREE',
    "settings" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auth_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'VIEWER',
    "institution_id" TEXT NOT NULL,
    "supabase_id" TEXT,
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auth_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trust_scores" (
    "id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "domain" "TrustDomain" NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "max_score" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "calculated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "trust_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidence_items" (
    "id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" "EvidenceCategory" NOT NULL,
    "trust_domain" "TrustDomain" NOT NULL,
    "file_url" TEXT,
    "content" TEXT,
    "compliance_status" "ComplianceStatus" NOT NULL DEFAULT 'PENDING',
    "tags" TEXT[],
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "created_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "evidence_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accessibility_scans" (
    "id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "scan_type" TEXT NOT NULL,
    "status" "ScanStatus" NOT NULL DEFAULT 'PENDING',
    "accessibility_score" DOUBLE PRECISION,
    "violations_count" INTEGER DEFAULT 0,
    "warnings_count" INTEGER DEFAULT 0,
    "results" JSONB,
    "scan_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "accessibility_scans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cyber_assessments" (
    "id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "assessment_type" TEXT NOT NULL,
    "framework" TEXT NOT NULL,
    "status" "AssessmentStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "overall_risk_level" "RiskLevel",
    "completion_percentage" DOUBLE PRECISION DEFAULT 0,
    "findings" JSONB,
    "recommendations" TEXT[],
    "due_date" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cyber_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_governance_items" (
    "id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "ai_system_name" TEXT NOT NULL,
    "description" TEXT,
    "risk_category" "RiskLevel" NOT NULL,
    "compliance_framework" TEXT NOT NULL,
    "compliance_status" "ComplianceStatus" NOT NULL DEFAULT 'PENDING',
    "review_date" TIMESTAMP(3),
    "next_review_date" TIMESTAMP(3),
    "responsible_person" TEXT,
    "documentation_url" TEXT,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_governance_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fvt_ge_items" (
    "id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "vendor_name" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "contract_number" TEXT,
    "fvt_status" "ComplianceStatus" NOT NULL DEFAULT 'PENDING',
    "ge_status" "ComplianceStatus" NOT NULL DEFAULT 'PENDING',
    "contract_start_date" TIMESTAMP(3),
    "contract_end_date" TIMESTAMP(3),
    "annual_spend" DOUBLE PRECISION,
    "risk_assessment" "RiskLevel",
    "documentation_url" TEXT,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fvt_ge_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_tiers" (
    "id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "tier" "SubscriptionTier" NOT NULL,
    "stripe_subscription_id" TEXT,
    "stripe_customer_id" TEXT,
    "current_period_start" TIMESTAMP(3),
    "current_period_end" TIMESTAMP(3),
    "features" JSONB NOT NULL DEFAULT '{}',
    "limits" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscription_tiers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "institutions_domain_key" ON "institutions"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "auth_users_email_key" ON "auth_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "auth_users_supabase_id_key" ON "auth_users"("supabase_id");

-- CreateIndex
CREATE INDEX "auth_users_institution_id_idx" ON "auth_users"("institution_id");

-- CreateIndex
CREATE INDEX "trust_scores_institution_id_idx" ON "trust_scores"("institution_id");

-- CreateIndex
CREATE INDEX "trust_scores_domain_idx" ON "trust_scores"("domain");

-- CreateIndex
CREATE INDEX "evidence_items_institution_id_idx" ON "evidence_items"("institution_id");

-- CreateIndex
CREATE INDEX "evidence_items_category_idx" ON "evidence_items"("category");

-- CreateIndex
CREATE INDEX "evidence_items_trust_domain_idx" ON "evidence_items"("trust_domain");

-- CreateIndex
CREATE INDEX "accessibility_scans_institution_id_idx" ON "accessibility_scans"("institution_id");

-- CreateIndex
CREATE INDEX "cyber_assessments_institution_id_idx" ON "cyber_assessments"("institution_id");

-- CreateIndex
CREATE INDEX "ai_governance_items_institution_id_idx" ON "ai_governance_items"("institution_id");

-- CreateIndex
CREATE INDEX "fvt_ge_items_institution_id_idx" ON "fvt_ge_items"("institution_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscription_tiers_institution_id_key" ON "subscription_tiers"("institution_id");

-- AddForeignKey
ALTER TABLE "auth_users" ADD CONSTRAINT "auth_users_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trust_scores" ADD CONSTRAINT "trust_scores_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence_items" ADD CONSTRAINT "evidence_items_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidence_items" ADD CONSTRAINT "evidence_items_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accessibility_scans" ADD CONSTRAINT "accessibility_scans_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cyber_assessments" ADD CONSTRAINT "cyber_assessments_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_governance_items" ADD CONSTRAINT "ai_governance_items_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fvt_ge_items" ADD CONSTRAINT "fvt_ge_items_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscription_tiers" ADD CONSTRAINT "subscription_tiers_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
