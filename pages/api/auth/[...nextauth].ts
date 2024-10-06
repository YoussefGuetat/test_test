// pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Ensure the user object has the expected properties
            if (user) {
                token.email = user.email || null; // Ensure this is not undefined
                token.id = user.id || "";         // Provide a default empty string
            }
            return token;
        },
        async session({ session, token }) {
            // Ensure that session.user is initialized
            session.user = {
                id: token.id as string || "", // Cast to string to ensure type
                email: token.email || null, // Attach email, can be null
                name: null,         // Set name if available
                image: null,        // Set image if available
            };
            return session;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl + '/profile'; // Redirect to profile page after login
        },
    },
    session: {
        strategy: 'jwt',
    },
});
