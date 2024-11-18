import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.'https://oxclvnkiiaquhujbdnjt.supabase.co';
const supabaseAnonKey = process.env.'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Y2x2bmtpaWFxdWh1amJkbmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NDM4NDEsImV4cCI6MjA0NzUxOTg0MX0.4V4WNwq8ktDKP8xmbOFgrO_emDBkITpfwk3H9IlKPv0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
