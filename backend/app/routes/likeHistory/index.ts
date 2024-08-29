import { Router } from "express";
import likeHistory from "./likeHistory";

const router = Router();

router.use("/", likeHistory);

export default router;
