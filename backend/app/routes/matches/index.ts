import { Router } from "express";
import users_to_match from "./users-to-match";
import like_user from "./like-user";

const router = Router();

router.use("/", users_to_match);
router.use("/", like_user);

export default router;
