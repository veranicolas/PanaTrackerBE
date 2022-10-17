
import express from 'express'
import { getFriendsUpdate, getMainChampion, getSummoner } from '../controller/summoner'

const summonerRouter = express.Router()

summonerRouter.get('/summoner/:name', getSummoner)

summonerRouter.get('/summoner/champion/:id', getMainChampion)

summonerRouter.post('/summoner/friends', getFriendsUpdate)

export { summonerRouter }