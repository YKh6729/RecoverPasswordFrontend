import express from "express";
import authRoute from "../routes/auth/auth.route";
import cors from "cors";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


app.use(
  cors({
    origin: "http://localhost:3000", // replace with your frontend URL
  })
);

// Basic route
app.use("/auth", authRoute);

export default app;
