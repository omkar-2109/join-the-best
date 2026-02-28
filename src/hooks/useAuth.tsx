import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  candidateProfileId: string | null;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [candidateProfileId, setCandidateProfileId] = useState<string | null>(null);

  const checkRole = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    setIsAdmin(data?.some((r: any) => r.role === "admin") ?? false);
  };

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("candidate_profiles")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();
    setCandidateProfileId(data?.id ?? null);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await checkRole(session.user.id);
          await fetchProfile(session.user.id);
        } else {
          setIsAdmin(false);
          setCandidateProfileId(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkRole(session.user.id);
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    return { error: result.error };
  };

  const signIn = async (email: string, password: string) => {
    const result = await supabase.auth.signInWithPassword({ email, password });
    return { error: result.error };
  };

  const signOut = async () => {
    await supabase.auth.signOut({ scope: 'local' });
    setUser(null);
    setSession(null);
    setIsAdmin(false);
    setCandidateProfileId(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, candidateProfileId, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
