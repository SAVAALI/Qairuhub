import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/** Creates a Supabase client for Server Components, Route Handlers, and Server Actions. */
export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  if (!supabaseUrl || !supabaseKey) throw new Error("Supabase environment variables are missing.");

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: any) {
        try {
          cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options: any }) => cookieStore.set(name, value, options));
        } catch {
          // Cookies cannot be changed during Server Component rendering.
        }
      },
    },
  });
};
//fix