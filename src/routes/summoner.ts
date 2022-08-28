
import express from 'express'
import { getMainChampion, getSummoner } from '../controller/summoner'

const summonerRouter = express.Router()

summonerRouter.get('/summoner/:name', getSummoner)

summonerRouter.get('/summoner/champion/:id', getMainChampion)

export { summonerRouter }