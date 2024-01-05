import { Router } from 'express';
import postRoutes from './post-routes.js';
import serieRoutes from './serie-routes.js';
import authRoutes from './auth-routes.js';
import userRoutes from './user-routes.js';
import otherRoutes from './other-routes.js';

const router = Router();

router.use('/post', postRoutes);
router.use('/serie', serieRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/other', otherRoutes);

export default router;
