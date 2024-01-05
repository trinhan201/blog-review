import { Router } from 'express';
import {
    createSerieController,
    editSerieController,
    deleteSerieByIdController,
    getAllSeriesController,
    getSerieByIdController,
} from '../controllers/serie-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.post('/create', verifyToken, createSerieController);
router.put('/edit/:serieId', verifyToken, editSerieController);
router.delete('/delete/:serieId', verifyToken, deleteSerieByIdController);
router.get('/get-all', getAllSeriesController);
router.get('/get/:serieId', getSerieByIdController);

export default router;
