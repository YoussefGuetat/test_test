import axios from 'axios';
import User from '../domain/User';

const createUser = async (sessionUser: any) => {
    const userData: User = {
        id: sessionUser.id,
        firstName: sessionUser.given_name || '',
        lastName: sessionUser.family_name || '',
        birthDate: new Date(), 
        address: '', 
        phoneNumber: '', 
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
};

export default UserService;
