import { Router } from "express";
import users from "./users";
import distance from "./distance";

const router = Router();

router.use("/", users);
router.use("/", distance);

export default router;
