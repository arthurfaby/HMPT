import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { Report } from "../../models/report_model";
import { User } from "../../models/user_model";

const router = Router();

router.post("/:userId", async (req: Request, res: Response) => {
  const authenticatedUser = await getAuthenticatedUser(req.sessionID);
  if (!authenticatedUser || !authenticatedUser.id) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }

  const userId = req.params.userId;
  if (userId.match(/^\d+$/) == null) {
    return res.status(400).send({
      error: "Invalid user id",
    });
  }

  const existingReport = await Report.select({
    reporter_id: {
      equal: authenticatedUser.id,
    },
    reported_id: {
      equal: parseInt(userId),
    },
  });

  if (existingReport.length > 0) {
    return res.status(200).send(existingReport[0].dto);
  }

  const report = new Report({
    reporter_id: authenticatedUser.id,
    reported_id: parseInt(userId),
  });

  try {
    await report.create();

    const reportedUser = await User.select({ id: { equal: parseInt(userId) } });
    if (reportedUser.length > 0) {
      reportedUser[0].fameRating = reportedUser[0].fameRating * 0.9;
      if (reportedUser[0].fameRating < 0) {
        reportedUser[0].fameRating = 0;
      }
      await reportedUser[0].update();
    }
  } catch (e) {
    return res.status(500).send({
      error: "Internal server error",
    });
  }

  return res.status(200).send(report.dto);
});

export default router;
