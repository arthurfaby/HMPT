import { Router, Request, Response } from "express";
import { User } from "../models/user_model";
import nodemailer from "nodemailer";
import { mailerConfig } from "../app";
import { VerificationToken } from "../models/verification_token_model";
import { Preference } from "../models/preference_model";

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

router.post("/", async (req: Request, res: Response) => {
  //const result = await db.query('SELECT username FROM users')
  const userDto = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    first_name: req.body.firstName,
    last_name: req.body.lastname,
  };

  if (!verifyPassword(userDto.password)) {
    return res.status(200).send({
      error:
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
    });
  }

  const existingUserByMail = await User.select({
    email: { equal: userDto.email },
  });
  if (existingUserByMail.length > 0) {
    return res.status(200).send({
      error: "Adresse email déjà utilisée",
    });
  }

  const existingUserByUsername = await User.select({
    username: { equal: userDto.username },
  });
  if (existingUserByUsername.length > 0) {
    return res.status(200).send({
      error: "Username déjà utilisé",
    });
  }

  try {
    const user = new User(userDto);
    await user.hash();
    await user.create();
    const usersWithId = await User.select({
      email: { equal: userDto.email },
    });
    if (!usersWithId || !usersWithId[0] || !usersWithId[0].id) {
      return res.status(200).send({
        error: "Erreur lors de la création de l'utilisateur",
      });
    }
    const userWithId = usersWithId[0];

    const preference = new Preference({
      user_id: userWithId.id!,
      age_gap_min: 18,
      age_gap_max: 100,
      fame_rating_min: 0,
      fame_rating_max: 5,
      distance: 1000000000,
      sexual_preference: "bisexual",
    });
    await preference.create();
    const preferenceWithId = await Preference.select({
      user_id: { equal: userWithId.id! },
    });
    if (!preferenceWithId || !preferenceWithId[0] || !preferenceWithId[0].id) {
      await user.delete();
      return res.status(200).send({
        error: "Erreur lors de la création des préférences",
      });
    }

    // Generate random token
    const token =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const verificationToken = new VerificationToken({
      user_id: userWithId.id!,
      token,
    });
    await verificationToken.create();
    // Send verification email
    try {
      const url = "http://localhost:3000/verify/" + token;
      const transporter = nodemailer.createTransport(mailerConfig);
      const message = {
        from: {
          name: "Matcha",
          address: "rabaudp@gmail.com",
        },
        to: user.email,
        subject: "Vérification de votre compte Matcha",
        html: "\
          <p>Bonjour,</p>\
          <p>\
            Pour finaliser votre inscription et accéder à toutes nos fonctionnalités,\
            nous avons besoin de vérifier votre adresse email.<br>\
            Cliquez sur le lien ci-dessous pour vérifier votre compte :\
          </p>\
          <a href={{url}} class='button'>\
            Vérifier mon compte\
          </a>",
      };

      message.html = message.html.replace("{{url}}", url);
      transporter.sendMail(message).then((_) => {
        return;
      });
      return res.status(200).send({
        message: "Email envoyé avec succès",
      });
    } catch {
      res.status(200).send({
        error: "Erreur lors de l'envoi de l'email de vérification",
      });
    }

    return res.status(200).send(user.dto);
  } catch (error) {
    return res.status(200).send({
      error: "Erreur lors de la création de l'utilisateur",
    });
  }
});

export default router;
