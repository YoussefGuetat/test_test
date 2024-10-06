// pages/api/users/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';

const users = new Map<string, any>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        const user = users.get(id as string);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } else if (req.method === 'POST') {
        const { firstName, lastName, birthDate, address, phoneNumber } = req.body;
        const newUser = { id, firstName, lastName, birthDate, address, phoneNumber };
        users.set(id as string, newUser); // Simulate user creation
        res.status(201).json(newUser);
    } else if (req.method === 'PUT') {
        const user = users.get(id as string);
        if (user) {
            const updatedUser = { ...user, ...req.body };
            users.set(id as string, updatedUser);
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
