import express, { Request, Response } from "express";
import { UserDto } from "./dtos/user_dto";
import { User } from "./models/user_model";

const app = express();
  
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 
 
app.get("/", async (req: Request, res: Response) => {
    try {
        return res.send(await User.select(["email", "username"], {email: {
            equal: "test"
        }}));
    
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).send({status: 500, error: error.message})
        }
        return res.status(500).send({status: 500, error: "Internal Server Error"})
    }  

 });

app.get("/test", async (req: Request, res: Response) => {
    try {
        const user = new User({
            email: "email",
            username: "username",
            password: "pass",
            first_name: "first",
            last_name: "last",
            gender: "male",
            biography: "biography",
            interests: ["a", "b"],
            pictures: ["a", "b"],
            verified: true,
            fame_rating: 5,
            geolocation: {latitude: 12, longitude: 32},
            accept_location: false,
            age: 21,
            online: true,
            last_online_date: '2024-04-12',
        } as UserDto)
        ;
        res.status(200).send(await user.create());
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).send({status: 500, error: error.message})
        }
        return res.status(500).send({status: 500, error: "Internal Server Error"})
    }  

 }
);

app.listen(5000,
    () => console.log(`⚡️[bootup]: Server is running at port: 5000`));