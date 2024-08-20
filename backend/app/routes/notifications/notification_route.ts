import { Router } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { Notification } from "../../models/notification_model";
import socketClient from "../../sockets/init";

const router = Router();

router.get("/", async (req, res) => {
    const authUser = await getAuthenticatedUser(req.sessionID);
    if (!authUser || authUser.id == null) {
        return res.status(401).send({
            error: "Unauthorized",
        });
    }
    const notifications = await Notification.select({
        user_id: {
            equal: authUser.id,
        },
    });
    if (notifications.length === 0) {
        return res.status(404).send({
            error: "Not found",
        });
    }
    return res.status(200).send(notifications.map((notification) => notification.dto));
});

router.post("/", async (req, res) => {
    const authUser = await getAuthenticatedUser(req.sessionID);
    if (!authUser || authUser.id == null) {
        return res.status(401).send({
            error: "Unauthorized",
        });
    }
    try {
        const notification = new Notification(req.body);
        await notification.update()
    }
    catch (e) {
        return res.status(400).send({
            error: 'Bad request',
        });
    }
});

export default router;