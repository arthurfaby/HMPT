import { Router, Request, Response } from 'express';
import db from '../database';
import { User } from '../models/users.models';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    //const result = await db.query('SELECT username FROM users')
    await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', ['req.body.username', 'req.body.email', 'req.body.password'])
})

export default router;