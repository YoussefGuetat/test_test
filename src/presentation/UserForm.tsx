// src/presentation/UserForm.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { validateAddress } from '../infrastructure/addressValidation'; // Import the address validation function

interface UserData {
    firstName: string;
    lastName: string;
    birthDate: string;
    address: string;
    phoneNumber: string;
}

interface UserFormProps {
    userId: string; // Add userId prop type
    userName: string; // Add userName prop type
}

const UserForm = ({ userId, userName }: UserFormProps) => {
    const { data: session } = useSession();
    const [userData, setUserData] = useState<UserData>({
        firstName: '',
        lastName: '',
        birthDate: '',
        address: '',
        phoneNumber: '',
    });

    useEffect(() => {
        if (session?.user) {
            // Fetch user data using the user ID
            axios.get(`/api/users/${userId}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch((error: unknown) => {
                    if (axios.isAxiosError(error) && error.response?.status === 404) {
                        // If user not found, create a new user with the session info
                        const nameParts = userName?.split(' ') || []; // Use optional chaining
                        setUserData({
                            firstName: nameParts[0] || '', // First name
                            lastName: nameParts[1] || '',  // Last name
                            birthDate: '', // Default value
                            address: '',
                            phoneNumber: '',
                        });
                    } else {
                        console.error('Error fetching user data:', error);
                    }
                });
        }
    }, [session, userId, userName]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (session?.user) {
            if (userData.firstName || userData.lastName) {
                try {
                    // Validate the address before updating
                    const isValidAddress = await validateAddress(userData.address);
                    if (!isValidAddress) {
                        alert('L\'adresse doit être située à moins de 50 km de Paris.');
                        return; // Stop the submission if the address is invalid
                    }

                    // Check if the user already exists
                    await axios.get(`/api/users/${userId}`);
                    // Update the user if they exist
                    await axios.put(`/api/users/${userId}`, userData);
                    alert('User updated successfully!'); // Notify user of success
                } catch (error: unknown) {
                    if (axios.isAxiosError(error) && error.response?.status === 404) {
                        // If the user does not exist, create a new user
                        await axios.post(`/api/users/${userId}`, userData);
                        alert('User created successfully!'); // Notify user of creation
                    } else {
                        console.error('Error updating user data:', error);
                        alert('An error occurred while updating user data.'); // User-friendly message
                    }
                }
            } else {
                alert('Please provide at least a first name or last name.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Prénom"
                value={userData.firstName}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Nom"
                value={userData.lastName}
                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            />
            <input
                type="date"
                value={userData.birthDate}
                onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
            />
            <input
                type="text"
                placeholder="Adresse"
                value={userData.address}
                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
            />
            <input
                type="text"
                placeholder="Numéro de téléphone"
                value={userData.phoneNumber}
                onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
            />
            <button type="submit">Mettre à jour</button>
        </form>
    );
};

export default UserForm;
