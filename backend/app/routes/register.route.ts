import { Router, Request, Response } from "express";
import db from "../database";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  //const result = await db.query('SELECT username FROM users')
  await db.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [req.body.username, req.body.email, req.body.password],
  );
  res.status(200).send("User registered");
});

export default router;
