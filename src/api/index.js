import { Router } from 'express';
import users from './users';


const router = new Router();


router.use('/users', users);


export default router