
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "./db";
import User from "../model/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;
                if (!email || !password) {
                    throw new Error("Please enter email and password");
                }
                await connectDb();
                const user = await User.findOne({ email })
                if (!user) {
                    throw new Error("User not found, please sign up");
                }
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    throw new Error("Incorrect password");
                }
                return {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    image: user.image
                }
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider === "google") {
                await connectDb();
                let existUser = await User.findOne({ email: user?.email });
                if (!existUser) {
                     existUser = await User.create({
                        name: user.name,
                        email: user?.email,

                    })
                }
                user.id=existUser._id as string
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
            }
            return token;
        },

        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.image = token.image as string;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET
}
export default authOptions;