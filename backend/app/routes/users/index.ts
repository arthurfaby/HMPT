import { Router } from "express";
import users from "./users";
import distance from "./distance";
import online from "./online";

const router = Router();

router.use("/", users);
router.use("/", distance);
router.use("/", online);

export default router;
