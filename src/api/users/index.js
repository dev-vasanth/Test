import { Router } from 'express';
import { signup, verifyEmail, signin, logout } from './controller';
import  requireLogin  from '../../middlewares/index'
const router = new Router();

router.post('/signup', signup);
router.put('/verify-email', verifyEmail)
router.post('/signin', signin)
router.get('/logout', requireLogin, logout)

export default router;
