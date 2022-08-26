
import express from 'express'
import { getMainChampion, getSummoner } from '../controller/summoner'

const summonerRouter = express.Router()

summonerRouter.get('/summoner', getSummoner)

summonerRouter.get('/summoner/champions', getMainChampion)

export { summonerRouter }