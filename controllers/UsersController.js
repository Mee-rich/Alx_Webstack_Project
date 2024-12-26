import sha1 from 'sha1';
import dbClient from '../utils/db';
import MentorController from './MentorController';
import MenteeController from './MenteeController';
import { userQueue } from '../utils/mailer';

export default class UsersController {
    // Post new data
    static async postNew(req, res) {
        const email = req.body ? req.body.email : null;
        const password = req.body ? req.body.password : null;
        const role = req.body && req.body.role ? req.body.role.toLowerCase() : null;

        if (!email) {
            res.status(400).json({ error: 'Missing email!' });
            return;
        }
        let reEmail = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
        if (!email || !reEmail.test(email)) {
            res.status(400).json({ error: 'Not a valid email!' });
            return;
        }
        if (!password) {
            res.status(400).json({ error: 'Missing password!' });
            return;
        }
        let rePass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!password || !rePass.test(password)) {
            return res.status(400).json({ error: 'Password validation failed!'});
        }
        if (!role || !['mentor', 'mentee'].includes(role)) {
            res.status(400).json({ error: 'Invalid role. Must be "mentor" or "mentee"!' });
            return;
        }
        
        
        const mentor_details = await MentorController.addMentor(role);
        const mentee_details = await MenteeController.addMentee(role);

    
        let details;
        if (role == 'mentor') {
            details = mentor_details;
        } else {
            details = mentee_details;
        };
        
        const user = await (await dbClient.usersCollection()).findOne({ email });

        if (user) {
            res.status(400).json({ error: 'Already exist!' });
            return;
        }
        const insertData = await (await dbClient.usersCollection())
            .insertOne({ 
                email, 
                password: sha1(password),
                role,
                details,
            });
        
        const userId = insertData.insertedId.toString();

        userQueue.add({ userId });
        res.status(200).json({ email, id: userId });
    };

    // Get user data
    static async getMe(req, res) {
        const user = req.user;

        res.status(200).json({ 
            // email: user.email, 
            // id: user._id.toString(), 
            //role: user.role.toString(),
            //details: user.details.toString(),
            user
        });
    }
}

