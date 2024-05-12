import { Request, Response, NextFunction } from "express"
import db from '../database';

export default async function auth(req: Request, res: Response, next: NextFunction) {
        const session = await db.query('SELECT user_id FROM sessions WHERE token = $1', [req.sessionID])
        if (session.rowCount) {
          next();
        } else {
          res.status(401).send('Unauthorized');
        }
      } 
