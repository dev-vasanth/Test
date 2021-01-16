import { Router } from 'express';
import { signUp } from './controller';
const router = new Router();

router.post('/signup',  signUp);

export default router;
