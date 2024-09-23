import { Router, Request, Response } from "express";
import getAuthenticatedUser from "../utils/auth/getAuthenticatedUser";
import { User } from "../models/user_model";
import { UserDto } from "../dtos/user_dto";

const router = Router();

function verifyPassword(password: string): boolean {
  const isLengthValid = password.length >= 8;
  const isUpperCaseValid = /[A-Z]/.test(password);
  const isLowerCaseValid = /[a-z]/.test(password);
  const isDigitValid = /[0-9]/.test(password);
  const isSymbolValid = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
  return (
    isLengthValid &&
    isUpperCaseValid &&
    isLowerCaseValid &&
    isDigitValid &&
    isSymbolValid
  );
}

router.get("/", async (req: Request, res: Response) => {
  const user = await getAuthenticatedUser(req.sessionID);
  if (!user) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  return res.status(200).send(user.dto);
});

router.post("/update", async (req: Request, res: Response) => {
  const user: User = new User(req.body);
  await user.update();
  return res.status(200).send({ message: "user updated" });
});

router.post("/usernameValid", async (req: Request, res: Response) => {
  try {
    const existingUserByUsername = await User.select({
      username: { equal: req.body.username },
    });
    if (existingUserByUsername.length > 0) {
      return res.status(200).send({
        error: "Username déjà utilisé",
      });
    } else
      return res.status(200).send({
        msg: "username pas utilise",
      });
  } catch {
    return res.status(200).send({
      error: "erreur serveur",
    });
  }
});

router.post("/changePassword", async (req: Request, res: Response) => {
  try {
    if (!verifyPassword(req.body.newPassword)) {
      return res.status(200).send({
        error:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
      });
    }
    const user = await getAuthenticatedUser(req.sessionID);
    if (!user)
      return res.status(200).send({ error: "erreur d'authentification" });
    user.password = req.body.newPassword;
    await user.hash();
    await user.update();
    return res.status(200).send({ message: "change password" });
  } catch (e) {
    res.status(200).send({ error: "token invalide" });
  }
});

export default router;
