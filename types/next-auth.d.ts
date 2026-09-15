import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name: string;
      image?: string;
      domain?: string;
    };
  }

  interface User {
    email: string;
    name: string;
    image?: string;
    domain?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    domain?: string;
  }
}
