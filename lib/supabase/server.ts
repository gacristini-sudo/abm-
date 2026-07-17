import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Server-side Supabase client for Server Components, Route Handlers, and Server
// Actions. Cookie writes are wrapped in try/catch because Server Components can't
// set cookies — only Server Actions and Route Handlers can; middleware refreshes
// the session in that case.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Called from a Server Component - safe to ignore, middleware handles refresh.
          }
        },
      },
    }
  );
}
