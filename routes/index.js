import { Express } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import MentorController from '../controllers/MentorController';
import UsersController from '../controllers/UsersController';
import BlogController from '../controllers/BlogController';
//import FilesController from '../controllers/FilesController';
import { setAuthHeader, basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';



/**
 * This adds routes with their handlers to the given Express application
 * @param {Express} api
 */
const injectRoutes = (api) => {
    api.get('/status', AppController.getStatus);
    api.get('/stats', AppController.getStats);

    api.get('/connect', setAuthHeader, basicAuthenticate, AuthController.getConnect);
    api.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

    api.post('/users', UsersController.postNew);
    api.get('users/me', xTokenAuthenticate, UsersController.getMe);

    api.post('/blogs', BlogController.blogNew);
    api.get('blogs/:id', BlogController.getBlogById);
    api.get('/blogs', BlogController.allBlogs);

    api.get('/mentor-count', MentorController.countMentors);
    api.get('/mentee-stats', MentorController.countMenteesPerMentor);

    api.all('*', (req, res, next) => {
        errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
    });
    api.use(errorResponse);
};

export default injectRoutes;