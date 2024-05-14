import { Router, Request, Response } from "express"
import db from '../database';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    //const result = await db.query('SELECT username FROM users')
   const request =  await db.query('SELECT password, id FROM users Where username = $1', [req.body.username])
   if (request.rowCount === 0) {
       res.status(401).send('Unauthorized')
       return
   }
   const { password, id } = request.rows[0]
   console.log(password)
   if (password === req.body.password) {
      await db.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2)', [id, req.sessionID]) 
       res.status(200).send('auth')
   }
   else {
        console.log('Unauthorized')
       res.status(401).send('Unauthorized')
   }
})

export default router