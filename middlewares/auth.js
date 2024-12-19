import { Request, Response, NextFunction} from 'express';
import auth from '../utils/auth';


const { createAuthorizationHeader, getUserFromXToken, getUserFromAuthorization } = auth;

/**
 * Set Authorization header
 * @param {Request} req- The Express route object
 * @param {Response} res- The Express response object
 * @param {NextFunction} next- The Express next function
 */
export const setAuthHeader = async (req, res, next) => {
    const base64Token = await createAuthorizationHeader(req);

    if (!base64Token) {
        res.status(400).json({ error: 'Error creating Basic Authorization token'});
    }
    req.headers.authorization = base64Token;

    // res.status(200).json({
    //     message: 'Authorization token created successfully',
    //     authorizationHeader: base64Token,  // Return the generated Base64 token
    // });

    next();
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
    // res.status(200).json({ message: `${user.email} authorized`});

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