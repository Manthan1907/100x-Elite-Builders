// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lqikcewkuypgydobewjg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxaWtjZXdrdXlwZ3lkb2Jld2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0NjE4NzIsImV4cCI6MjA2MzAzNzg3Mn0.eaHRDLkZreJpFinGEpfWvRyyo8jM5ibJ1ErH6gDupMw";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);