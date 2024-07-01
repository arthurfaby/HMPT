import { Router } from "express";
import block from "./block";

const router = Router();

router.use("/", block);

export default router;
