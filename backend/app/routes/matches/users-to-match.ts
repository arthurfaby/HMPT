import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import query from "../../libs/orm/queries/abstract_query";
import { UserDtoArrayAsString } from "../../models/user_model";
import { parseUserQueryResponse } from "../../utils/parsing/parseUserQueryResponse";

const router = Router();

router.get("/usersToMatch", async (req: Request, res: Response) => {
  const authUser = await getAuthenticatedUser(req.sessionID);
  if (!authUser) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }
  const queryResponse = await query<UserDtoArrayAsString>(`
  SELECT *
  FROM users u
  WHERE
      u.id != ${authUser.id}
      AND u.id NOT IN (
          SELECT liked_id
          FROM matches
          WHERE
              liker_id = ${authUser.id}
      )
      AND u.id NOT IN (
          SELECT blocked_id
          FROM blocks
          WHERE
              blocker_id = ${authUser.id}
      )
  `);

  const userDtos = parseUserQueryResponse(queryResponse);
  return res.json(userDtos);
});

export default router;
