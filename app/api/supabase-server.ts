import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const errorMessage = "No se pudo conectar a la base de datos";
if (!supabaseUrl) {
  throw new Error(errorMessage, {cause: "NEXT_PUBLIC_SUPABASE_URL no esta definida"});
} else if (!supabaseKey) {
  throw new Error(errorMessage, {cause: "SUPABASE_SERVICE_ROLE_KEY no esta definida"});
}

export const supabaseServer = createClient(supabaseUrl, supabaseKey);