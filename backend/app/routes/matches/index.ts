import { Router } from "express";
import users_to_match from "./users-to-match";

const router = Router();

router.use("/", users_to_match);

export default router;
