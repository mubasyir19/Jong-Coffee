import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import bcrypt from "bcryptjs";

const db = drizzle(process.env.DATABASE_URL!);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Cari user di database (Logika Drizzle kamu)
        const [user] = await db
          .select()
          .from(userTable)
          .where(eq(userTable.email, credentials.email as string));

        if (!user) return null;

        // 2. Cek password (Logika Bcrypt kamu)
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!isPasswordValid) return null;

        // 3. Return object user (akan disimpan di JWT)
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.fullname,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub; // token.sub sekarang dipastikan string
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Arahkan ke custom login page kamu
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handlers as GET, handlers as POST };
