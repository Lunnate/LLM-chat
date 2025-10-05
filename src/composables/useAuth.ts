import { ref } from "vue";
import { supabase } from "../api/supabase.ts";
import type { User, Session } from "@supabase/supabase-js";

const user = ref<User | null>(null);
const isLoading = ref<boolean>(false);
const session = ref<Session | null>(null);

supabase.auth.getSession().then(({ data }) => {
  user.value = data.session?.user ?? null;
  session.value = data.session;
});

supabase.auth.onAuthStateChange((_event, newSession) => {
  user.value = newSession?.user ?? null;
  session.value = newSession;
});

async function signUp(email: string, password: string): Promise<void> {
  try {
    isLoading.value = true;
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) throw error;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  } finally {
    isLoading.value = false;
  }
}
async function signIn(email: string, password: string): Promise<void> {
  try {
    isLoading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) throw error;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  } finally {
    isLoading.value = false;
  }
}

async function signOut(): Promise<void> {
  try {
    isLoading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  } finally {
    isLoading.value = false;
  }
}
async function resetPasswordRequest(email: string): Promise<void> {
  try {
    isLoading.value = true;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/new-password",
    });
    if (error) throw error;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  } finally {
    isLoading.value = false;
  }
}
async function resetPassword(newPassword: string): Promise<void> {
  try {
    isLoading.value = true;
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  } finally {
    isLoading.value = false;
  }
}

export const useAuth = () => {
  return {
    user,
    isLoading,
    session,
    signUp,
    signIn,
    signOut,
    resetPasswordRequest,
    resetPassword,
  };
};
