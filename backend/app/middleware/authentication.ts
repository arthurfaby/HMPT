import { Request, Response, NextFunction } from "express";
import db from "../database";
import { Session } from "../models/session_model";

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("auth");
  const session = await Session.select({
    token: {
      equal: req.sessionID,
    },
  });
  console.log(session);
  if (session.length !== 0) {
    next();
  } else {
    res.status(401).send({ error: "Unauthorized" });
  }
}
