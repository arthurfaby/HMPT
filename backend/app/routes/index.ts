import { Router } from "express";
import registerRouter from "./register.route";
import me from "./me.route";
import login from "./login.route";
import auth from "../middleware/authentication";
import logout from "./logout.route";
import mail from "./mail.route"
import factory_user from './factories/user.route';


const router = Router();

router.use("/register", registerRouter);
router.use("/me", auth, me);
router.use("/login", login);
router.use("/logout", auth, logout);
router.use("/mail", mail )
router.use("/factories", factory_user);
export default router;
