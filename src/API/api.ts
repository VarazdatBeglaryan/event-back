import { Router } from 'express';
import authRoutes from '../authentication/authentication.routes.js';

const router = Router();

router.post('/auth/signup', authRoutes.createUser);

export default router