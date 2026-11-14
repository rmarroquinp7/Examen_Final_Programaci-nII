import { supabase } from "../lib/supabase";

export const authService = {
  async iniciarSesion(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  async cerrarSesion() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};