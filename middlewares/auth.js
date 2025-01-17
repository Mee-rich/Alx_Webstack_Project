import { Request, Response, NextFunction} from 'express';
import auth from '../utils/auth';
import { passwordQueue } from '../utils/mailer';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';


const { createAuthorizationHeader, getUserFromXToken, getUserFromAuthorization, decodePasswordResetToken, createPasswordResetToken } = auth;


/**
 * Set Authorization header
 * @param {Request} req- The Express route object
 * @param {Response} res- The Express response object
 * @param {NextFunction} next- The Express next function
 */
export const setAuthHeader = async (req, res, next) => {
    const base64Token = await createAuthorizationHeader(req);

    try{
        if (!base64Token) {
            throw new Error('Error creating Basic Authorization token')
            
        }
        req.headers['authorization'] = base64Token;
        next();


    } catch (error){
        res.status(400).json({ error: error.message });
    }

};

/**
 * Adds Basic Authentication to a route
 * @param {Request} req- The Express route object
 * @param {Response} res- The Express response object
 * @param {NextFunction} next- The Express next function
 */
export const basicAuthenticate = async (req, res, next) => {
    const user = await getUserFromAuthorization(req);

    if  (!user) {
        res.status(401).json({ error: 'Unauthorized'});
        return;
    }

    req.user = user;
    next();
};

/**
 * Adds X-Token authentication to a route
 * @param {Request} req- The Express requst object
 * @param {Response} res- The Express response object
 * @param {NextFunction} next- The Express next function
 */
export const xTokenAuthenticate = async (req, res, next) => {
    const user = await getUserFromXToken(req);

    if (!user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    req.user = user;

    next();
};

/**
 * Sets the reset token in redis database
 * @param {*} req- The Express request object
 * @param {*} res - The Express response object
 * @param {*} next - The Express next object
 */
export const resetToken = async (req, res, next) => {
    const { token, hashedToken, user} = await createPasswordResetToken(req);

    const userId = user._id;
    const email = user.email;

    if (!userId) {
        res.status(400).json({ error: 'User Id missing!'})
    }

    await redisClient.set(`password_reset_${token}`, user._id.toString(), 1 * 60);
    await redisClient.set(`hashedToken_${hashedToken}`, user._id.toString(), 15 * 60);

    passwordQueue.add({ userId, token });
    req.email = email;
    next();
}

/**
 * Verify reset token in the redis database
 * @param {*} req - The Express request object
 * @param {*} res - The Express response object
 * @param {*} next - The Express next object
 */

export const verifyResetToken = async (req, res, next) => {
    const hashedTokenNew  = decodePasswordResetToken(req);

    const userId = await redisClient.get(hashedTokenNew);

    if (!userId) {
        return res.status(400).json({ error: 'Invalid token'});
    }

    const user = await (await dbClient.usersCollection())
        .findOne({ userId });
    
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized '});
    }

    req.email = user.email;
    next()
}

