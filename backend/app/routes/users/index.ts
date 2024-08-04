import { Router } from "express";
import users from "./users";
import distance from "./distance";
import online from "./online";
import geolocation from "./geolocation";

const router = Router();

router.use("/", users);
router.use("/", distance);
router.use("/", online);
router.use("/", geolocation);

export default router;
