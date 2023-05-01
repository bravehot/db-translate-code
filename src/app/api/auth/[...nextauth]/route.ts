import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const anthOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, anthOptions);

export { authHandler as GET, authHandler as POST };
