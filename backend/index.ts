import express, { Response, Request } from "express";
import select from "./libs/orm/queries/select";
import pool from "./database";

const app = express();
  
app.use(express.urlencoded({ extended: true })) 
app.use(express.json()) 

app.get("/", async (req: Request, res: Response) => {
    try {
        return res.send(await select("users", ["email", "username"], {
            id: {
                equal: 1
            }
        }));
    
    } catch (error: unknown) {
        if (error instanceof Error) {
            return res.status(500).send({status: 500, error: error.message})
        }
        return res.status(500).send({status: 500, error: "Internal Server Error"})
    }  

 });

app.get("/test", async (req: Request, res: Response) => {
    try {
        // Create test user
        const data = await pool.query(`INSERT INTO users (email, username, password) VALUES ('a@a.com', 'test', 'test')`);
        res.status(200).send(data);
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