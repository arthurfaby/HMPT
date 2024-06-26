import { Router } from "express";
import auth from "../middleware/authentication";
import block from "./block/index";
import chat from "./chat/index";
import factory_user from "./factories/user.route";
import login from "./login.route";
import logout from "./logout.route";
import mail from "./mail.route";
import matches from "./matches/index";
import me from "./me.route";
import message from "./messages/index";
import register from "./register.route";
import report from "./report/index";
import users from "./users/index";

const router = Router();

router.use("/block", auth, block);
router.use("/chat", auth, chat);
router.use("/factories", factory_user);
router.use("/login", login);
router.use("/logout", auth, logout);
router.use("/mail", mail);
router.use("/matches", auth, matches);
router.use("/me", auth, me);
router.use("/message", auth, message);
router.use("/register", register);
router.use("/report", auth, report);
router.use("/users", auth, users);

export default router;
