import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./models/db.js";
import AuthRoute from "./Route/AuthRoute.js";
dotenv.config();

const port = process.env.PORTS;
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(AuthRoute);

app.listen(port, () => console.log(`Backend is running ${port}`));
