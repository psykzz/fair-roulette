import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://aokwckqgyzjazrdbcfzx.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFva3dja3FneXpqYXpyZGJjZnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4OTU2MzEsImV4cCI6MjA3MTQ3MTYzMX0.VwzGVAeNNtoumfGl7TR3ut1SVre6wUhKwzStmMV7NqQ";

// Only create supabase client if both URL and key are provided
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type Database = {
  public: {
    Tables: {
      team_members: {
        Row: {
          id: string;
          name: string;
          weight: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          weight?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          weight?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
