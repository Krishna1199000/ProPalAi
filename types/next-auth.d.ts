import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      profileImage?: string
    } & DefaultSession["user"]
  }

  interface User {
    profileImage?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
  }
}