import { Router } from 'express';
import { changePasswordController, getPublicInfoController } from '../controllers/user-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// Sign in
router.patch('/change-password', verifyToken, changePasswordController);

// Get some public infomation of all users route
router.get('/public-info', getPublicInfoController);

export default router;
