import { Router } from 'express';
import { signInController, getCurrentUserController } from '../controllers/auth-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// Sign in
router.post('/signin', signInController);

// Get current user route
router.get('/current-user', verifyToken, getCurrentUserController);

export default router;
