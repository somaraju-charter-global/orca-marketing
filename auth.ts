import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Auth0({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
  ],
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
    async session({ session }) {
      if (session.user?.email) {
        const domain = session.user.email.split("@")[1]?.toLowerCase();
        session.user.domain = domain;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account?.provider === "auth0" && token.email) {
        const domain = token.email.split("@")[1]?.toLowerCase();
        token.domain = domain;
      }
      return token;
    },
  },
});
