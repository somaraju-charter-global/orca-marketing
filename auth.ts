import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      if (pathname.startsWith("/login")) return true;
      if (pathname.startsWith("/api/auth")) return true;
      if (pathname.startsWith("/_next")) return true;

      // All other routes, including /api/upload and /api/manage, require login.
      return isLoggedIn;
    },
  },
});
