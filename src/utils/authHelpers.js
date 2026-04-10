import { supabase } from "../supabaseClient";

export const loginWithPhone = async (phone) => {
  // We create/get user session manually
  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) {
    console.error(error);
    return null;
  }

  return data.user;
};