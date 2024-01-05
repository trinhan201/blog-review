import { Router } from 'express';
import { getAllOthersController, sendEmailController } from '../controllers/other-controllers.js';

const router = Router();

router.get('/get-all-others', getAllOthersController);
router.post('/send-email', sendEmailController);

export default router;
