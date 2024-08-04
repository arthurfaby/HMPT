import { Router } from "express";
import { VerificationToken } from "../../models/verification_token_model";
import { User } from "../../models/user_model";

const router = Router();

router.post("/:token", async (req, res) => {
  const token = req.params.token;

  const verificationToken = await VerificationToken.select({
    token: { equal: token },
  });

  if (verificationToken.length === 0) {
    res.status(404).send("Token not found");
    return;
  }

  const tokenToDelete = verificationToken[0];
  const user = (
    await User.select({
      id: { equal: tokenToDelete.userId },
    })
  )[0];

  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  user.verified = true;
  await user.update();
  await tokenToDelete.delete();
  return res.status(200).send({ message: "User verified" });
});

export default router;
