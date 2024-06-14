import { Router } from "express";

import chat from "./chat";
import chat_user_ids from "./chat-user-ids";

const router = Router();

router.use("/", chat);
router.use("/", chat_user_ids);

export default router;
