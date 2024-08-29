import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user_model";
import { mailerConfig } from "../app";

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

router.post("/forget_password", async (req: Request, res: Response) => {
  const user = await User.select({ username: { equal: req.body.username } });
  if (!(user && user[0])) {
    return res.status(200).send({ error: "nom d'utilisateur incorrect" });
  }
  const token = jwt.sign(
    { username: req.body.username },
    process.env.PASSJWT as string,
    {
      expiresIn: "300s",
    }
  );
  const url = "http://localhost:3000/forget_password/" + token;

  try {
    const transporter = nodemailer.createTransport(mailerConfig);

    const message = {
      from: {
        name: "matcha",
        address: "rabaudp@gmail.com",
      },
      to: user[0].email,
      subject: "Réinitialisation de votre mot de passe.",
      html: "<p>Bonjour,</p><p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email. Sinon, vous pouvez réinitialiser votre mot de passe en cliquant sur le bouton ci-dessous :</p><a href=url class='button'>Réinitialiser mon mot de passe</a>",
    };

    message.html = message.html.replace("url", url);
    const sendMail = await transporter
      .sendMail(message)
      .then((_) => {
        return true;
      })
      .catch(() => {
        return false;
      });
    if (!sendMail) {
      return res.status(200).send({ error: "email invalide" });
    }
    return res.status(200).send({ message: "send email" });
  } catch {
    res.status(200).send({ error: "error server mail" });
  }
});

router.post("/change_password", async (req: Request, res: Response) => {
  if (req.body.token) {
    try {
      if (!verifyPassword(req.body.newPassword)) {
        return res.status(200).send({
          error:
            "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
        });
      }
      //.env !!
      const decoded = jwt.verify(
        req.body.token,
        process.env.PASSJWT as string
      ) as JwtPayload;
      const user = await User.select({ username: { equal: decoded.username } });
      user[0].password = req.body.newPassword;
      await user[0].hash();
      await user[0].update();
      return res.status(200).send({ message: "change password" });
    } catch (e) {
      res.status(200).send({ error: "token invalide" });
    }
  } else return res.status(200).send({ error: "pas de token" });
});

export default router;
