import { supabase } from '$lib/supabase';
import type { User } from '@supabase/supabase-js';
import { browser } from '$app/environment';
import { base } from '$app/paths';

// manual state management for user since $state runes can't be used externally
class AuthState {
  private user: User | null = null;

  getUser() {
    return this.user;
  }

  setUser(user: User | null) {
    this.user = user;
  }
}

export const authState = new AuthState();

// user state initialization
if (browser) {
  // getting the current session
  supabase.auth.getSession().then(({ data: { session } }) => {
    authState.setUser(session?.user ?? null);
  });

  // setting up the auth state listener
  supabase.auth.onAuthStateChange((_event, session) => {
    authState.setUser(session?.user ?? null);
  });
}

//sign in function, logs in a user
export async function signIn(username: string, password: string) {
  try {
    const email = `${username}@gmail.com`; //email spoofing since supabase needs email

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    authState.setUser(data.user); //sets the user state to the user
    return data;
  } catch (e) {
    throw e;
  }
}

//sign up function, creates a user in the auth and adds them to the profiles table
export async function signUp(username: string, password: string) {
  try {
    const email = `${username}@gmail.com`; //email spoofing since supabase needs email
    console.log('Attempting signup with:', { email, username });

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username } //only username and password are taken for auth for simplicity of testing
      }
    });

    if (authError) throw authError;
    authState.setUser(authData.user);
    console.log('Signup successful');

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles') //adding of user to the profiles table
        .insert([
          {
            id: authData.user.id,
            username
          }
        ]);

      if (profileError) {
        throw profileError;
      }
    }

    return authData;
  } catch (e) {
    console.error('Signup failed:', e);
    throw e;
  }
}

//sign out function
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  authState.setUser(null);
  window.location.href = `${base}/`; 
}

// check if user is authenticated
export async function requireAuth() {
  if (browser) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const user = authState.getUser();
  console.log('Checking auth after delay, current user:', user);

  if (!user && browser) {
    window.location.href = `${base}/`; 
    throw new Error('Not authenticated');
  }
  return user;
}