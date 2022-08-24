
import express from 'express'
import { getSummoner } from '../controller/summoner'

const summonerRouter = express.Router()

summonerRouter.get('/summoner', getSummoner)

export { summonerRouter }