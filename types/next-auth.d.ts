// types/next-auth.d.ts

import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;        // User ID (string)
            email: string | null; // User email (can be null)
            name?: string | null; // Optional user name
            image?: string | null; // Optional user image
        };
    }

    interface JWT {
        id: string;          // User ID (string)
        email: string | null; // User email (can be null)
    }
}
