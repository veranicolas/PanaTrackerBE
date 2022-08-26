import express, { Express } from "express";
import 'dotenv/config'

import { summonerRouter } from "./routes/summoner";

const app:Express = express()
app.use(express.json())
app.use(summonerRouter)

export { app }