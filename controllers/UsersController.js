import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

export default class UsersController {
    static async postNew(req, res) {
        const email = req.body ? req.body.email : null;
        const password = req.body ? req.body.password : null;
        const role = req.body ? req.body.role : null;

        if (!email) {
            res.status(400).json({ error: 'Missing email' });
            return;
        }
        if (!password) {
            res.status(400).json({ error: 'Missing password' });
            return;
        }
        if (!role || !['mentor', 'mentee'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role. Must be "mentor" or "mentee"'
            });
        }
        const user = await dbClient.usersCollection.findOne({ email });

        if (user) {
            res.status(400).json({ error: 'Already exist' });
            return;
        }
        const insertData = await dbClient.usersCollection()
            .insertOne({ 
                email, 
                password: sha1(password),
                role,
                mentorId: role === 'mentee' ? null : undefined,
                mentees: role === 'mentor'   ? [] : undefined,
            });
        
        const userId = insertData.insertedId.toString();

        userQueue.add({ userId });
        res.status(201).json({ email, id: userId });
    }

    static async getMe(req, res) {
        const { user } = req;

        res.status(200).json({ 
            email: user.email, 
            id: user._id.toString(), 
            role: user.role.toString() });
    }
}