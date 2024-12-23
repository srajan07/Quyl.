// /src/api/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Ensure this is properly configured
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Ensure this is properly configured

export const supabase = createClient(supabaseUrl, supabaseKey);
