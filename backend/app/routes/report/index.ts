import { Router } from "express";
import report from "./report";

const router = Router();

router.use("/", report);

export default router;
