import express, { Request, Response, NextFunction } from 'express';
import { GetVandorProfile, UpdateVandorCoverImage, UpdateVandorProfile, UpdateVandorService, VandorLogin, addFood, getFoods } from '../controllers';
import { Authenticate } from '../middlewares';
import multer from 'multer';

const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const images = multer({ storage: imageStorage }).array('images', 10);

router.post('/login', VandorLogin);

router.use(Authenticate);
router.get('/profile',Authenticate, GetVandorProfile);
router.patch('/profile', UpdateVandorProfile);
router.patch('/service', UpdateVandorService);
router.patch('/coverimage', images, UpdateVandorCoverImage);

router.post('/food', images,  addFood);
router.get('/foods', getFoods);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    return res.json('Hello World! from AdminRoute');
});

export { router as VandorRoute };