import { Router, Request, Response } from "express";
import bcrypt, { hash } from "bcryptjs";
import db from "../database";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  //const result = await db.query('SELECT username FROM users')
  const salt = await bcrypt.genSalt(10);
  bcrypt.hash(req.body.password, salt).then(hash => {
    db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [req.body.username, req.body.email, hash],
    );
    res.status(200).send("User registered");
    }
  ).catch(err => {res.status(400).send("Error")});
});

export default router;
