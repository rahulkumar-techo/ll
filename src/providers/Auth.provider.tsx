import type { Session } from '@supabase/auth-js'
import { PropsWithChildren, useEffect, useState } from 'react'
import { AuthContext, Profile } from '@/contexts/Auth.context'
import { supabase } from '@/utils/supabase'


const AuthProvider = ({ children }: PropsWithChildren) => {
    const [session, setSession] = useState<Session | null>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)

    const premiumExpiresAt = profile?.premium_expires_at ?? null

    const isPremium =
        !!profile?.is_premium &&
        (!premiumExpiresAt ||
            new Date(premiumExpiresAt).getTime() > Date.now());

    const loadProfile = async (s: Session | null) => {
        if (!s) {
            setProfile(null)
            return;
        }
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', s.user.id)
                .maybeSingle();

            if (error) {
                console.error('Failed to load profile:', error)
                setProfile(null)
                return
            }

            setProfile(data ?? null)
        } catch (error) {
            console.error('Unexpected profile load error:', error)
            setProfile(null)
        }
    }

    useEffect(() => {
        let isMounted = true;

        const init = async () => {
            try {
                if (isMounted) {
                    setLoading(true);
                }

                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('Failed to restore session:', error)
                }

                const initSession = data?.session ?? null;

                if (isMounted) {
                    setSession(initSession);
                }

                await loadProfile(initSession);
            } catch (error) {
                console.error('Unexpected session init error:', error)
                if (isMounted) {
                    setSession(null);
                    setProfile(null);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        init();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
            if (isMounted) {
                setSession(newSession);
            }

            loadProfile(newSession).finally(() => {
                if (isMounted) {
                    setLoading(false)
                }
            })
        })

        return () => {
            isMounted = false;
            subscription.unsubscribe()
        }

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
