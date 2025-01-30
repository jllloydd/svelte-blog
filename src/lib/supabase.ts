import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    realtime: {
        params: {
            eventsPerSecond: 10
        }
    }
})

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
        posts: {
          Row: {
            id: string
            created_at: string
            updated_at: string
            user_id: string  
            title: string
            content: string
          }
          Insert: {
            id?: string 
            created_at?: string
            updated_at?: string
            user_id: string
            title: string
            content: string
          }
          Update: {
            id?: string
            created_at?: string
            updated_at?: string
            user_id?: string
            title?: string
            content?: string
          }
        }
      }
    }
  }