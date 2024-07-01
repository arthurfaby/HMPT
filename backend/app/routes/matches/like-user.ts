import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../../utils/auth/getAuthenticatedUser";
import { Match } from "../../models/match_model";
import { Chat } from "../../models/chat_model";
import { User } from "../../models/user_model";

const router = Router();

router.post("/likeUser/:id", async (req: Request, res: Response) => {
  const authUser = await getAuthenticatedUser(req.sessionID);

  if (!authUser || !authUser.id) {
    return res.status(401).send({
      error: "Unauthorized",
    });
  }

  const userToLikeId = req.params.id;

  if (userToLikeId.match(/^[0-9]+$/) === null) {
    return res.status(400).send({
      error: "Invalid user ID",
    });
  }

  // Check if the like already exists
  const existingMatchAsLiker = await Match.select({
    liker_id: {
      equal: authUser.id,
    },
    liked_id: {
      equal: parseInt(userToLikeId),
    },
  });

  if (existingMatchAsLiker.length > 0) {
    return res.status(200).send(existingMatchAsLiker[0].dto);
  }

  const existingMatchAsLiked = await Match.select({
    liker_id: {
      equal: parseInt(userToLikeId),
    },
    liked_id: {
      equal: authUser.id,
    },
  });

  const match = new Match({
    liker_id: authUser.id,
    liked_id: parseInt(userToLikeId),
  });

  // If the other user has already liked the current user, create a chat because they are a match
  if (existingMatchAsLiked.length > 0) {
    const existingChat =
      (
        await Chat.select({
          user1_id: { equal: authUser.id },
          user2_id: { equal: parseInt(userToLikeId) },
        })
      )[0] ||
      (
        await Chat.select({
          user1_id: { equal: parseInt(userToLikeId) },
          user2_id: { equal: authUser.id },
        })
      )[0];

    if (existingChat && existingChat.id) {
      match.chatId = existingChat.id;
      existingMatchAsLiked[0].chatId = existingChat.id;
    } else {
      const chat = new Chat({
        user1_id: authUser.id,
        user2_id: parseInt(userToLikeId),
      });
      await chat.create();
      const createdChats = await Chat.select({
        user1_id: { equal: authUser.id },
        user2_id: { equal: parseInt(userToLikeId) },
      });
      const createdChat = createdChats[0];
      if (createdChat?.id) {
        existingMatchAsLiked[0].chatId = createdChat.id;
        match.chatId = createdChat.id;
      } else {
        return res.status(500).send({
          error: "Error while creating chat.",
        });
      }
    }
    existingMatchAsLiked[0].update();
  }
  await match.create();
  const likedUser = await User.select({ id: { equal: parseInt(userToLikeId) } });
  if (likedUser.length > 0) {
    likedUser[0].fameRating = likedUser[0].fameRating * 1.1
    if (likedUser[0].fameRating > 5) {
      likedUser[0].fameRating = 5;
    }
    await likedUser[0].update();
  }
  
  return res.json(match.dto);
});

export default router;
