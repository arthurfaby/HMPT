import { Router } from "express";
import auth from "../middleware/authentication";
import block from "./block/index";
import chat from "./chat/index";
import factory_user from "./factories/user.route";
import history from "./history/index";
import likeHistory from "./likeHistory/index";
import login from "./login.route";
import logout from "./logout.route";
import matches from "./matches/index";
import me from "./me.route";
import message from "./messages/index";
import mail from "./mail.route";
import preference from "./preferences.route";
import register from "./register.route";
import report from "./report/index";
import users from "./users/index";
import verify from "./verify/index";
import notification from "./notifications/notification_route";

const router = Router();

// Auth routes
router.use("/block", auth, block);
router.use("/chat", auth, chat);
router.use("/history", auth, history);
router.use("/likeHistory", auth, likeHistory);
router.use("/logout", auth, logout);
router.use("/matches", auth, matches);
router.use("/me", auth, me);
router.use("/message", auth, message);
router.use("/report", auth, report);
router.use("/users", auth, users);
router.use("/notifications", auth, notification);

// Non-auth routes
router.use("/factories", factory_user);
router.use("/login", login);
router.use("/mail", mail);
router.use("/factories", factory_user);
router.use("/users", auth, users);
router.use("/chat", auth, chat);
router.use("/message", auth, message);
router.use("/matches", auth, matches);
router.use("/preferences", auth, preference);
router.use("/register", register);
router.use("/verify", verify);

export default router;
