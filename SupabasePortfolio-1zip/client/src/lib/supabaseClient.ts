import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface ContactSubmission {
  id?: number;
  name: string;
  email: string;
  message: string;
  created_at?: string;
}

export async function submitContactForm(data: Omit<ContactSubmission, 'id' | 'created_at'>) {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  }

  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert([{ ...data, created_at: new Date().toISOString() }])
    .select();

  if (error) {
    throw error;
  }

  return result;
}
