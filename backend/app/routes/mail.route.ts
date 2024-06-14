import { Router, Request, Response } from "express";
import nodemailer from "nodemailer";
import jwt, { JwtPayload } from "jsonwebtoken"
import { User } from "../models/user_model";

const router = Router()

router.post("/forget_password", async (req: Request, res: Response) => {

    const user = await User.select({username: {equal: req.body.usrnemame}})
    if(user && user[0])
        return res.status(502).send('username not found')
    const token = jwt.sign({username: req.body.username}, "prout", {expiresIn: '300s'})
    const url = 'http://localhost:3000/forget_password/' + token
    let config = {
    service: 'gmail',
    auth: {
        user: 'rabaudp@gmail.com',
        pass: 'damz dsek jgfn vnjs'
    }
    }
    try {
        const transporter = nodemailer.createTransport(config)

        const message = {
            from:{
                name: 'matcha',
                address: 'rabaudp@gmail.com'
            },
            to: user[0].email,
            subject: 'reset password',
            html: "<p>bonjour,</p><p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email. Sinon, vous pouvez réinitialiser votre mot de passe en cliquant sur le bouton ci-dessous :</p><a href=url class='button'>Réinitialiser mon mot de passe</a><p>Ce lien expirera dans 24 heures.</p>",
        };

        message.html = message.html.replace('url', url)
        transporter.sendMail(message).then((info) => console.log(info))
        return res.status(200).send('send email')
    }
    catch {
        res.status(502).send('error server mail')
    }
});

router.post("/change_password", async(req: Request, res: Response) => {
    if(req.body.token){
        try {
            
            const decoded = jwt.verify(req.body.token, "prout") as JwtPayload
            const user = await User.select({username: {equal: decoded.username}}) 
            user[0].password = req.body.newPassword
            await user[0].hash()
            await user[0].update()
            return res.status(200).send('change password');
        }
        catch {
            res.status(401).send({error: 'token invalid'})
        }
    }
    else
        return res.status(400).send({error: 'no token'})
})

export default router