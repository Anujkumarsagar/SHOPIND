import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_DBSUPABASE_URL!, process.env.NEXT_PUBLIC_DBSUPABASE_ANON_KEY!)
}
