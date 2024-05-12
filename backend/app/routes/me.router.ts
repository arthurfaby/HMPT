import { Router, Request, Response } from "express"

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    return res.status(200).send('Hello World')
})

export default router