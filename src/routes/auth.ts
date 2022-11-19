import express from 'express';
import controller from '../controllers/auth';

const router = express.Router();

router.post('/sign-in', controller.SignIn);
router.get('/refresh', controller.ReAuthWithRefreshToken);

export = router;
