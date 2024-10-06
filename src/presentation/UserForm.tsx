import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { validateAddress } from '../infrastructure/addressValidation';

interface UserData {
    firstName: string;
    lastName: string;
    birthDate: string;
    address: string;
    phoneNumber: string;
}

interface UserFormProps {
    userId: string; 
    userName: string; 
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); 

    useEffect(() => {
        if (session?.user) {
            axios.get(`/api/users/${userId}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch((error: unknown) => {
                    if (axios.isAxiosError(error) && error.response?.status === 404) {
                        const nameParts = userName?.split(' ') || [];
                        setUserData({
                            firstName: nameParts[0] || '', 
                            lastName: nameParts[1] || '', 
                            birthDate: '', 
                            address: '',
                            phoneNumber: '',
                        });
                    } else {
                        console.error('Error fetching user data:', error);
                    }
                });
        }
    }, [session, userId, userName]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!userData.firstName) newErrors.firstName = "Prénom est requis.";
        if (!userData.lastName) newErrors.lastName = "Nom est requis.";
        if (!userData.address) newErrors.address = "Adresse est requise.";
        if (!userData.phoneNumber) newErrors.phoneNumber = "Numéro de téléphone est requis.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (session?.user) {
            if (validateForm()) { 
                try {
                 
                    const isValidAddress = await validateAddress(userData.address);
                    if (!isValidAddress) {
                        setErrors((prev) => ({ ...prev, address: "L'adresse doit être située à moins de 50 km de Paris." }));
                        return; 
                    }

                    await axios.get(`/api/users/${userId}`);
                    await axios.put(`/api/users/${userId}`, userData);
                    alert('User updated successfully!'); 
                } catch (error: unknown) {
                    if (axios.isAxiosError(error) && error.response?.status === 404) {
                        await axios.post(`/api/users/${userId}`, userData);
                        alert('User created successfully!'); 
                    } else {
                        console.error('Error updating user data:', error);
                        alert('An error occurred while updating user data.'); 
                    }
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
                <label htmlFor="firstName">Prénom</label>
                <input
                    id="firstName"
                    type="text"
                    className="form-control"
                    placeholder="Prénom"
                    value={userData.firstName}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                />
                {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>} {/* Error message */}
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Nom</label>
                <input
                    id="lastName"
                    type="text"
                    className="form-control"
                    placeholder="Nom"
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                />
                {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>} {/* Error message */}
            </div>
            <div className="form-group">
                <label htmlFor="birthDate">Date de Naissance</label>
                <input
                    id="birthDate"
                    type="date"
                    className="form-control"
                    value={userData.birthDate}
                    onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">Adresse</label>
                <input
                    id="address"
                    type="text"
                    className="form-control"
                    placeholder="Adresse"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                />
                {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>} {/* Error message */}
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Numéro de téléphone</label>
                <input
                    id="phoneNumber"
                    type="text"
                    className="form-control"
                    placeholder="Numéro de téléphone"
                    value={userData.phoneNumber}
                    onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                />
                {errors.phoneNumber && <span style={{ color: 'red' }}>{errors.phoneNumber}</span>} {/* Error message */}
            </div>
            <button type="submit" className="btn btn-primary">Mettre à jour</button>
        </form>
    );
};

export default UserForm;
