// pages/profile.tsx
import { useSession, signOut } from 'next-auth/react';
import UserForm from '../src/presentation/UserForm';

const Profile = () => {
    const { data: session } = useSession();

    if (!session) {
        return <div>You are not logged in.</div>;
    }

    // Split the user name into first name and last name
    const nameParts = session.user.name ? session.user.name.split(' ') : [];
    const firstName = nameParts[0] || 'Guest'; // Fallback to 'Guest' if no name
    const lastName = nameParts[1] || ''; // Fallback to an empty string

    // Ensure userName is a string
    const userName = session.user.name || ''; // Provide a default value

    return (
        <div>
            <h1>Welcome, {firstName} {lastName}</h1>
            <p>Email: {session.user.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
            <UserForm userId={session.user.id} userName={userName} /> {/* Pass user ID and name to UserForm */}
        </div>
    );
};

export default Profile;
