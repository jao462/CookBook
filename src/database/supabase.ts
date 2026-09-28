import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ override: true });

console.log('URL:', process.env.SUPABASE_URL);
console.log('KEY existe:', !!process.env.SUPABASE_KEY);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'SUPABASE_URL e SUPABASE_KEY precisam estar configurados no arquivo .env'
  );
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);