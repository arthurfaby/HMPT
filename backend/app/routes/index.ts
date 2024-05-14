import { Router } from "express";
import registerRouter from "./register.route";
import me from "./me.route";
import login from "./login.route";
import auth from "../middleware/authentication";
import logout from "./logout.route";

const router = Router();

router.use("/register", registerRouter);
router.use("/me", auth, me);
router.use("/login", login);
router.use("/logout", auth, logout);
export default router;
