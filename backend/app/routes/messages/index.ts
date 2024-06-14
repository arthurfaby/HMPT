import { Router } from "express";
import message from "./message";

const router = Router();

router.use("/", message);

export default router;
