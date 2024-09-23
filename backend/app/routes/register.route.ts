import { Router, Request, Response } from "express";
import { User } from "../models/user_model";
import { Preference } from "../models/preference_model";
import { Session } from "../models/session_model";
import { SessionDto } from "../dtos/session_dto";
import nodemailer from "nodemailer";
import { mailerConfig } from "../app";
import { VerificationToken } from "../models/verification_token_model";

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

  const existingUserByUsername = await User.select({
    username: { equal: userDto.username },
  });
  if (existingUserByUsername.length > 0) {
    return res.status(200).send({
      error: "Username déjà utilisé",
    });
  }

  // Generate random token
  const token =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  try {
    const url = "http://localhost:3000/verify/" + token;
    const transporter = nodemailer.createTransport(mailerConfig);
    const message = {
      from: {
        name: "Matcha",
        address: "rabaudp@gmail.com",
      },
      to: req.body.email,
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
    const testMail = await transporter
      .sendMail(message)
      .then((_) => {
        return true;
      })
      .catch((error) => {
        return false;
      });
    if (!testMail)
      return res.status(200).send({
        error: "Email invalide",
      });
  } catch {
    res.status(200).send({
      error: "Erreur lors de l'envoi de l'email de vérification",
    });
  }
  try {
    const user = new User(userDto);
    user.pictures = ["", "", "", "", "", ""];
    user.fameRating = 2.5;
    await user.hash();
    await user.create();
    const newUser = await User.select({ username: { equal: user.username } });
    if (newUser.length > 0 && newUser[0].id !== undefined) {
      const userPreference = new Preference({
        user_id: newUser[0].id,
        age_gap_min: 18,
        age_gap_max: 150,
        fame_rating_min: 0,
        fame_rating_max: 1000,
        sexual_preference: "bisexual",
        distance: 22000,
        interests: [],
      });
      await userPreference.create();
    }
    const usersWithId = await User.select({
      username: { equal: userDto.username },
    });
    if (!usersWithId || !usersWithId[0] || !usersWithId[0].id) {
      return res.status(200).send({
        error: "Erreur lors de la création de l'utilisateur",
      });
    }
    const userWithId = usersWithId[0];

    const verificationToken = new VerificationToken({
      user_id: userWithId.id!,
      token,
    });
    // Send verification email

    await verificationToken.create();
    return res.status(200).send(user.dto);
  } catch (error) {
    return res.status(200).send({
      error: "Erreur lors de la création de l'utilisateur",
    });
  }
});

export default router;
