import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes";
import Session from "express-session";
import { User } from "./models/user_model";
import { createServer } from "http";
import { Server } from "socket.io";
import { initIO } from "./sockets/init";
import handleErrorMiddleware from "./middleware/error";

// Create Express server
const app = express(); // New express instance
const httpServer = createServer(app);
const port = 5000; // Port number
const corsOptions = {
  credentials: true, // Access-Control-Allow-Credentials à true
  origin: "http://localhost:3000", // Access-Control-Allow-Origin spécifique à votre domaine
  methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes autorisées
};

// Express configuration
app.use(cors(corsOptions)); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan("dev")); // Enable Morgan
app.use(express.json());

const sessionMiddleware = Session({
  secret: "prout",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
});

app.use(sessionMiddleware);

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

app.use("/", router);

// Start Express server
httpServer.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Server started at http://localhost:${port}`);
});

// Export Socket.io server
export const io = new Server(httpServer, {
  cors: corsOptions,
});

io.engine.use(sessionMiddleware);

initIO();

// Export Express app
export default app;
