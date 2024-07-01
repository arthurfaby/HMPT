import { Router, Request, Response } from "express";
import { User } from "../models/user_model";
import nodemailer from "nodemailer";
import { mailerConfig } from "../app";
import { VerificationToken } from "../models/verification_token_model";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  //const result = await db.query('SELECT username FROM users')
  const userDto = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    first_name: req.body.firstName,
    last_name: req.body.lastname,
  };

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
    console.log(user.dto);
    const usersWithId = await User.select({
      email: { equal: userDto.email },
    });
    if (!usersWithId || !usersWithId[0] || !usersWithId[0].id) {
      return res.status(200).send({
        error: "Erreur lors de la création de l'utilisateur",
      });
    }
    const userWithId = usersWithId[0];

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
