import { NextAuthOptions } from 'next-auth';
import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { User as PrismaUser } from '@prisma/client';

const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { username: credentials.username }
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (user) {
        session.user = { ...session.user, role: (user as PrismaUser).role };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as PrismaUser).role;
      }
      return token;
    }
  },
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
