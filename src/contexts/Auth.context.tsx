import type { Session, User } from '@supabase/auth-js'
import { createContext, useContext } from 'react'

export type Profile = {
  id: string
  full_name: string | null
  username: string | null
  avatar_url: string | null
  is_premium: boolean
  premium_plan: 'monthly' | 'yearly' | null
  premium_expires_at: string | null
}

type AuthContextType = {
  session: Session | null
  user: User | null
  profile: Profile | null
  loading: boolean
  isAdmin: boolean
  isPremium: boolean
  refreshProfile: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  isPremium: false,
  refreshProfile: async () => {}
})

export const useAuth = () => useContext(AuthContext)
