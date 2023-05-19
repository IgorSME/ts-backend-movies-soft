import express from "express";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response} from "express";
import { IError } from "./types/appType";

dotenv.config();

import authRouter from "./routes/api/auth";
import moviesRouter from "./routes/api/movies";

const app:express.Application = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/movies", moviesRouter);

app.use((_req:Request, res:Response) => res.status(404).json({ message: "Not Found" }));
app.use((err:IError, _req:Request, res:Response) => {
  const { status = 500} = err;
  res.status(status).json({ message: err.message });
});

export default app;
