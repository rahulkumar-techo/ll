import type { Session } from '@supabase/auth-js'
import { PropsWithChildren, useEffect, useState } from 'react'
import { AuthContext, Profile } from '@/contexts/Auth.context'
import { supabase } from '@/utils/supabase'


const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    const premiumExpiresAt = profile?.premium_expires_at ?? null
    const premiumPlan = profile?.premium_plan ?? 'free'

    const isPremium =
        !!profile?.is_premium &&
        (!premiumExpiresAt ||
            new Date(premiumExpiresAt).getTime() > Date.now());

    const loadProfile = async (s: Session | null) => {
        if (!s) {
            setProfile(null)
            return;
        }
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', s.user.id)
            .maybeSingle();

        if (error) {
            console.error(error)
            return
        }

        setProfile(error ? null : data)
    }

    useEffect(() => {

        const init = async () => {
            setLoading(true);
            const { data } = await supabase?.auth?.getSession();
            const initSession = data?.session ?? null;
            setSession(initSession);
            await loadProfile(initSession);
            setLoading(false);
        };
        init();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setLoading(true);
            setSession(newSession);
            loadProfile(newSession).finally(() => {
                setLoading(false)

            })
        })

        return () => subscription.unsubscribe()

    }, []);


    return (
        <AuthContext.Provider
            value={{
                session,
                user: session?.user ?? null,
                profile,
                loading,
                isAdmin: false,
                isPremium,
                refreshProfile: () => loadProfile(session)
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
