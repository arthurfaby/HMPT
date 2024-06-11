import { Router } from "express";
import chat from "./chat";

const router = Router();

router.use("/", chat);

export default router;
