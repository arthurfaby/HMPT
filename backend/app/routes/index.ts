import { Router } from "express";
import registerRouter from "./register.route";
import me from "./me.route";
import login from "./login.route";
import auth from "../middleware/authentication";
import logout from "./logout.route";
import factory_user from "./factories/user.route";
import users from "./users.route";

const router = Router();

router.use("/register", registerRouter);
router.use("/me", auth, me);
router.use("/login", login);
router.use("/logout", auth, logout);
router.use("/factories", factory_user);
router.use("/users", users);

export default router;
