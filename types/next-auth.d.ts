import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { SttConfiguration } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: { 
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      profileImage?: string | null;
      phone?: string | null;
      createdAt?: Date;
      updatedAt?: Date;
      sttConfiguration?: SttConfiguration | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    profileImage?: string | null;
    phone?: string | null;
    createdAt: Date;
    updatedAt: Date;
    sttConfiguration?: SttConfiguration | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    profileImage?: string | null;
    phone?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    sttConfiguration?: SttConfiguration | null;
  }
}