import { Router } from 'express';
import authRoutes from '../authentication/authentication.routes.js';
import userRoutes from '../user/user.routes.js';
import jwt from 'jsonwebtoken';
import SECRET from '../../config.js';

const router = Router();

const authenticate = function(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.tokenInfo = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

router.post('/auth/signup', authRoutes.createUser);

router.post('/auth/login', authRoutes.loginUser);

router.post('/auth/logout', authRoutes.loginUser)

router.get('/user', authenticate, userRoutes.getUser);

export default router