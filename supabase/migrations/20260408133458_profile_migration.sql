-- =========================================
-- TABLE: profiles
-- Stores extended user data linked 1:1 with Supabase auth.users.
-- Includes personal info, onboarding status, interests, and premium details.
-- =========================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT,
    language_level TEXT,
    interests TEXT[],
    is_onboarding_completed BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    premium_expires_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- RLS (Row Level Security)
-- Enables row-level access control so users can only interact with their own data.
-- Required for all policies to work.
-- =========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- =========================================
-- POLICY: SELECT
-- Allows users to read only their own profile.
-- Condition: logged-in user ID must match profile ID.
-- =========================================
CREATE POLICY "Users can read own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- =========================================
-- POLICY: INSERT
-- Allows users to create only their own profile.
-- Prevents inserting data for another user.
-- =========================================
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- =========================================
-- POLICY: UPDATE
-- Allows users to update only their own profile.
-- USING → controls which rows can be updated (before update)
-- WITH CHECK → ensures data remains valid after update (no ownership change)
-- =========================================
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- =========================================
-- PERMISSIONS (GRANT)
-- Gives authenticated (logged-in) users basic access.
-- Actual access is still controlled by RLS policies above.
-- =========================================
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;