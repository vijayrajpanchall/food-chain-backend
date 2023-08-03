import express, { Request, Response, NextFunction } from 'express';
import { CreateVandor, GetVandorByID, GetVandors } from '../controllers/AdminController';

const router = express.Router();

router.post('/createVandor', CreateVandor);
router.post('/vandors', GetVandors);
router.get('/vandor/:id', GetVandorByID);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    return res.json('Hello World! from AdminRoute');
});

export { router as AdminRoute };