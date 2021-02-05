import express, { Application, json, Request, Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import check from "./middleware/check";
import auth from "./middleware/auth";

config();

export const app: Application = express();

app.use(cors());
app.use(json());

app.get("/", (_req: Request, res: Response) => {
  return res.send("API Running...");
});

app.use(express.json());
app.use("/", express.static("public"));

app.get("/", (_req, res) => {
  res.status(200);
  res.sendFile(`${__dirname}/public/index.html`);
});

app.post("/auth", auth);

app.post("/private", check, (req, res) => {
  res.status(200);
  res.json({
    err: null,
    data: req.body,
  });
});
