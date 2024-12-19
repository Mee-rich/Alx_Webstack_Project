import sha1 from 'sha1';
import { Request } from 'express';
import mongoDBCore from 'mongodb/lib/core';
import dbClient from './db';
import redisClient from './redis';


/**
 * Creates base64Token on user login
 * @param {Request} req- The Express request object
 * @returns {base64} token- The authorization token
 */
const createAuthorizationHeader = async (req) => {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;

    if (!email || !password) {
        return null;
    }

    const base64Token = Buffer.from(`${email}:${password}`).toString('base64');

    return (`Basic ${base64Token}`);

};



/**
 * Extract the user from the Authorization 
 * header in the given request object
 * @param {Request} req- The Express request object.
 * @returns {Promise<{_id: ObjectId, email: string, password: string}>}
 */
const getUserFromAuthorization = async (req) => { 
        const authorization = req.headers.authorization || null;

        if (!authorization) {
            return null;
        }
        const authorizationToken = authorization.split(' ');

        if (authorizationToken.length !==2 || authorizationToken[0] !== 'Basic') {
            return null;
        }

        const token = Buffer.from(authorizationToken[1], 'base64').toString();
        const splitPos = token.indexOf(':');
        const email = token.substring(0, splitPos);
        const password = token.substring(splitPos + 1);

        const user = await (await dbClient.usersCollection()).findOne({ email });

        if (!user || sha1(password) !== user.password) {
            return null;
        }

        return user;
};


/**
 * Gets the user from the X-Token 
 * header in the given request object
 * @param {Request} req- The Express request object.
 * @returns {Promise<{_id: ObjectId, email: string, password: string}>}
 */
const getUserFromXToken = async (req) => {
    const token = req.headers['x-token'];

    if (!token) {
        return null;
    }
    const userId = await redisClient.get(`auth_${token}`);
    if (!userId) {
        return null;
    }
    const user = await dbClient.usersCollection()
        .findOne({ _id: new mongoDBCore.BSON.ObjectId(userId) });
    return user || null;
};

export default {
    getUserFromAuthorization: async (req) => getUserFromAuthorization(req),
    getUserFromXToken: async (req) => getUserFromXToken(req),
    createAuthorizationHeader: async (req) => createAuthorizationHeader(req),
};