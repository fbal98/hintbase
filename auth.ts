import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { SupabaseAdapter } from "@auth/supabase-adapter";

if (!process.env.NEXT_PUBLIC_AUTH_SECRET) {
  throw new Error(
    "NEXT_PUBLIC_AUTH_SECRET is not set in the environment variables"
  );
}

if (
  !process.env.NEXT_PUBLIC_AUTH_GITHUB_ID ||
  !process.env.NEXT_PUBLIC_AUTH_GITHUB_SECRET
) {
  throw new Error(
    "GitHub OAuth credentials are not set in the environment variables"
  );
}

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
) {
  throw new Error(
    "Supabase credentials are not set in the environment variables"
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.NEXT_PUBLIC_AUTH_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_AUTH_GITHUB_SECRET,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
  }),
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
});
