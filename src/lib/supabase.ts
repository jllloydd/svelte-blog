import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Database {
    public: {
      Tables: {
        profiles: {
          Row: {
            id: string
            created_at: string
            updated_at: string | null
            username: string | null
            bio: string | null
          }
          Insert: {
            id: string
            created_at?: string
            updated_at?: string
            username?: string
            bio?: string
          }
          Update: {
            id?: string
            created_at?: string
            updated_at?: string
            username?: string
            bio?: string
          }
        }
      }
    }
  }