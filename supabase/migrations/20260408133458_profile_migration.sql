-- =========================================================
-- TABLE: public.profiles
-- ---------------------------------------------------------
-- Purpose:
-- Stores extended user profile data (1:1 with auth.users).
-- This table powers personalization, AI behavior, progress,
-- and subscription logic in the Lexa app.
-- =========================================================

CREATE TABLE IF NOT EXISTS public.profiles (
    -- -----------------------------------------------------
    -- Primary Key (linked with Supabase auth.users)
    -- -----------------------------------------------------
    id UUID PRIMARY KEY 
        REFERENCES auth.users(id) ON DELETE CASCADE,

    -- -----------------------------------------------------
    -- Basic User Info
    -- -----------------------------------------------------
    full_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    bio TEXT ,
     CONSTRAINT bio_length CHECK(LENGTH(bio)<=30)

    -- -----------------------------------------------------
    -- Language & Learning Configuration
    -- -----------------------------------------------------
    native_language TEXT NOT NULL, -- User's native language (e.g. Hindi)
    target_language TEXT DEFAULT 'English', -- Language user wants to learn

    language_level TEXT 
        CHECK (language_level IN ('beginner', 'intermediate', 'advanced')),

    learning_goal TEXT, -- e.g. 'Fluency', 'Interview Prep'
    daily_goal_minutes INT DEFAULT 10 CHECK (daily_goal_minutes > 0),

    -- -----------------------------------------------------
    -- User Preferences
    -- -----------------------------------------------------
    interests TEXT[], -- e.g. ['tech', 'travel']

    preferred_tone TEXT 
        DEFAULT 'friendly'
        CHECK (preferred_tone IN ('formal', 'casual', 'friendly')),

    correction_mode BOOLEAN DEFAULT TRUE, -- Enable grammar correction
    voice_enabled BOOLEAN DEFAULT FALSE,  -- Voice interaction enabled

    -- -----------------------------------------------------
    -- Progress & Engagement Tracking
    -- -----------------------------------------------------
    xp_points INT DEFAULT 0 CHECK (xp_points >= 0),
    streak_days INT DEFAULT 0 CHECK (streak_days >= 0),
    last_active_at TIMESTAMPTZ,

    -- -----------------------------------------------------
    -- Subscription / Monetization
    -- -----------------------------------------------------
    is_premium BOOLEAN DEFAULT FALSE,

    premium_plan TEXT  
        CHECK (premium_plan IN ('monthly', 'yearly','free')),

    premium_expires_at TIMESTAMPTZ,

    -- -----------------------------------------------------
    -- Onboarding Status
    -- -----------------------------------------------------
    is_onboarding_completed BOOLEAN DEFAULT FALSE,

    -- -----------------------------------------------------
    -- Timestamps
    -- -----------------------------------------------------
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================
-- INDEXES (Performance Optimization)
-- Speeds up common queries (important for scaling)
-- =========================================================

CREATE INDEX IF NOT EXISTS idx_profiles_username 
ON public.profiles(username);

CREATE INDEX IF NOT EXISTS idx_profiles_premium 
ON public.profiles(is_premium);

CREATE INDEX IF NOT EXISTS idx_profiles_last_active 
ON public.profiles(last_active_at);

-- =========================================================
-- FUNCTION: update_updated_at_column
-- Automatically updates 'updated_at' on row update
-- =========================================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call function before update
CREATE TRIGGER trigger_update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- =========================================================
-- ROW LEVEL SECURITY (RLS)
-- Ensures users can only access their own data
-- =========================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------
-- POLICY: SELECT
-- Users can read only their own profile
-- ---------------------------------------------------------
CREATE POLICY "select_own_profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- ---------------------------------------------------------
-- POLICY: INSERT
-- Users can create only their own profile
-- ---------------------------------------------------------
CREATE POLICY "insert_own_profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- ---------------------------------------------------------
-- POLICY: UPDATE
-- Users can update only their own profile
-- ---------------------------------------------------------
CREATE POLICY "update_own_profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- =========================================================
-- PERMISSIONS
-- Grants access to authenticated users (RLS still applies)
-- =========================================================

GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;