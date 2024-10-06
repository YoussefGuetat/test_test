// src/application/UserService.ts
import axios from 'axios';
import User from '../domain/User';

const createUser = async (sessionUser: any) => {
    const userData: User = {
        id: sessionUser.id,
        firstName: sessionUser.given_name || '',
        lastName: sessionUser.family_name || '',
        birthDate: new Date(), // Set a default or prompt for this
        address: '', // Prompt for this later
        phoneNumber: '', // Prompt for this later
    };

    try {
        const response = await axios.post('/api/users', userData);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        throw error;
    }
};

const UserService = {
    createUser,
    // ... other methods
};

export default UserService;
