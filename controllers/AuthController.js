import { v4 as uuid4 } from "uuid";
import redisClient from '../utils/redis';

export default class AuthController {
    static async getConnect(req, res) {
        const { user } = req;
        const token = uuid4();

        await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
        res.setHeader(
            'X-token', `${token}`
        )
        res.status(200).json({ token });
        return;
    }

    static async getDisconnect(req, res) {
        const token = req.headers['X-token'];

        await redisClient.del(`auth_${token}`);
        res.status(204).json({message: 'Successfully logged out...'});
        return;
    }
}