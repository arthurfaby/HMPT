import { Router } from 'express';
import registerRouter from './register.routes'
import me from './me.router'
import login from './login.routes'  
import auth from '../middleware/authentication';

const router = Router();

router.use('/register', registerRouter)
router.use('/me', auth, me )
router.use('/login', login)
export default router