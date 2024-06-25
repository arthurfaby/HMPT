import { Router } from "express";
import users_to_match from "./users-to-match";
import like_user from "./like-user";
import dislike_user from "./dislike-user";
import cancel from "./cancel";

const router = Router();

router.use("/", users_to_match);
router.use("/", like_user);
router.use("/", dislike_user);
router.use("/", cancel);

export default router;
