import { Router } from "express";
import seeProfile from "./seeProfile";
import history from "./history";

const router = Router();

router.use("/", seeProfile);
router.use("/", history);

export default router;
