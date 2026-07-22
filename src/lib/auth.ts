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


        const user = await findUserByEmail(credentials.email);


        if (!user) {
          return null;
        }


        const passwordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );


        if (!passwordCorrect) {
          return null;
        }


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


  secret: process.env.NEXTAUTH_SECRET,
};