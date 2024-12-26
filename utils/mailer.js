import nodemailer  from 'nodemailer';
import { dbClient } from '../utils/db';
import credential from '../credentialMe';
import Queue from 'bull/lib/queue';
// import { userQueue } from '../controllers/UsersController';
// import { fileQueue } from '../controllers/FilesController';
// import { passwordQueue } from '../middlewares/auth';
import { ObjectId } from 'mongodb';

const passwordQueue = new Queue('Password reset token sending', { redis: 'localhost:6379' });
const userQueue = new Queue('email sending', { redis: 'localhost:6379' });


const USER_EMAIL = credential.gmail.email;
const USER_APP_PASSWORD = credential.gmail.password; // Gmail app password

// const fetchId = new ObjectId();

// Nodemailer configuration 
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: USER_EMAIL,
        pass: USER_APP_PASSWORD,
    },

});

userQueue.process(async (job, done) => {
    const userId = job.data.userId || null;
    
    if (!userId) {
        throw new Error('Missing userId');
    }
    const user = await (await dbClient.usersCollection())
        .findOne({ _id: new ObjectId(userId) });

    // let { to, subject, text, html } = job.data;

    const text = [ 
        `Hello ${user.name}`,
        'Welcome to Expero',
        'You have been sucessfully registered',
    ];

    const html =
    `<h1>
            <p>Hello {{ user.name }}</p>
            <p>Welcome to Expero</p>
            <p>You have been successfully registered</p></>
    </h1>
    `;
    try{
            transporter.sendMail({
            from: 'Expero',
            address: USER_EMAIL,
            to: `${user.email}`,
            subject: `Registration Successful`,
            text,
            html,
        });
        res.json({ message: "message sent" + info.messageId });

    } catch (err) {
        done(err);
    }
});


passwordQueue.process(async (job, done) => {
    const userId = job.data.userId || null;
    const token = job.data.token || null;

    if (!userId) {
        throw new Error('Missing userId');
    }
    if (!token) {
        throw new Error
    }
    const user = await (await dbClient.usersCollection())
        .findOne({ _id: new ObjectId(userId) });

    const text = [ 
        `Hello ${user.name}`,
        'Click the link below to reset your password',
        'You will be redirected!',
        `http://localhost:5000/reset_password/${token}`,
    ];

    const html =
    `<h1>
            <p>Hello {{ user.name }}</p>
            <p>Click the link below to reset your password</p>
            <p>You will be redirected!</p>
            <p>http://localhost:5000/reset_password/${token}</p>
    </h1>`;

    try{
        await transporter.sendMail({
            from: USER_EMAIL,
            to: `${user.email}`,
            subject: 'Password Reset Request',
            text,
            html,
        });
        res.json({ message: "message sent" + info.messageId });

    } catch (err) {
        done(err);
    }
});

export {
    userQueue,
    passwordQueue,
    // fileQueue,
};