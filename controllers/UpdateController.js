import dbClient from "../utils/db";
import sha1 from 'sha1';


export default class UpdateController {
    static async updateDetails (req, res) {
        const user = req.user || null;

        const {...otherDetails} = req.body;

        if (!otherDetails) {
            return res.status(401).json({ error: 'Other details missing!'});
        }

        if (req.body.password) {
            return res.status(401).json({ error: 'Password in update info!'})
        }

        const email = user.email;
        
        const updateData = await (await dbClient.usersCollection())
            .updateOne(
                { email },
                { $set:{...otherDetails} },
            )

        res.status(200).json({ user, updateData });
    }

    static async updatePassword (req, res) {
        const user = req.user;
        const password1 = req.body ? req.body.password1 : undefined;
        const password2 = req.body ? req.body.password2 : undefined;

        if (!password1 || !password2) {
            return res.status(400).json({ error: "Password to change missing!"})
        }

        if (!password1 === password2) {
            return res.status(400).json({ error: 'Password entries not the same!'})
        }

        const rePass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!password1 || !rePass.test(password1)) {
            return res.status(400).json({ error: 'Password validation failed!'})
        }

        const email = user.email;
        
        const updateData = await (await dbClient.usersCollection())
            .updateOne(
                {email},
                {$set: {password: sha1(password1)}}
            )
        res.status(200).json({ updateData });

    }

    // Sends reset password email to user
    static async resetPasswordLink (req, res) {
        const email = req.email;

       

        res.status(201).json({ message: `Password reset email sent to ${email}` });
        
    }

    static async resetPassword (req, res) {
        const { email } = req.email;

        const { password1, password2 } = req.body;

        if (!password1 || password1 !== password2) {
            return res.status(400).json({ error: 'Password entries not the same!'});
        }

        const rePass = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!password1 || !rePass.test(password1)) {
            return res.status(400).json({ error: 'Password validation failed!'});
        }

        const updateData = await (await dbClient.usersCollection())
            .updateOne(
                {email},
                {$set: {password: sha1(password1)}}
            )
        res.status(200).json({ updateData });

        // res.redirect('/')     
        res.status(201).json({ success: `Password reset token confirmed for ${email}` });
    }

    
}