import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { findUserByEmail } from "@/services/user.service";


export const authOptions = {
  providers: [
    CredentialsProvider({

      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },


      async authorize(credentials) {

        if (!credentials?.email || !credentials?.password) {
          return null;
        }


        // chercher user f database
        const user = await findUserByEmail(credentials.email);


        if (!user) {
          return null;
        }


        // comparer password
        const passwordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );


        if (!passwordCorrect) {
          return null;
        }


        // user li ghadi ttsayeb f session
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],


  session: {
    strategy: "jwt",
  },


  pages: {
    signIn: "/login",
  },


  secret: process.env.NEXTAUTH_SECRET,
};


const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };