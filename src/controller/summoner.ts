import axios from "axios"
import { Request, Response } from "express" 

import { getRankData, getHighestMasteries, getSummonerDataFormat, getUpdatedFriendsInfo } from "../services/summonerServices"

const BASE_URL = 'https://la2.api.riotgames.com'
const CURRENT_PATCH = '12.19.1'

const getMainChampion = async (req:Request, res:Response) =>{

    try{
        const { data } = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${CURRENT_PATCH}/data/en_US/champion.json`)

        //@ts-ignorets-ignore
        const masterieData:any = await getHighestMasteries(req.params.id)
    
        let mainChampionData:any
        const mainChampionArray = Object.keys(data.data)
            .map((champion)=>{
                if(data.data[champion].key == masterieData.data[0].championId){
                    mainChampionData = data.data[champion]
                }
            })

        return res.status(200).send({...mainChampionData, currentPatchURL:`http://ddragon.leagueoflegends.com/cdn/${CURRENT_PATCH}`})

    } catch(error){
        return res.status(500).send({message:'Error', error})
    }
}

const getSummoner = async (req:Request ,res:Response) =>{

    try{
        const { data } = await axios.get(`${BASE_URL}/lol/summoner/v4/summoners/by-name/${req.params.name}?api_key=${process.env.RIOT_API}`)
        const rankedData = await getRankData(data.id)

        const summonerObject = getSummonerDataFormat(rankedData,data)
        
        return res.status(200).send({summonerObject})
    
    } catch(error){
        return res.status(404).send({
            message:'Error',
            error
        })
    }
}

const getFriendsUpdate = async (req:Request, res:Response) =>{

    try{
        const friendsIDs:any[] = req.body.friendsIDs
        const summonersObjects = await getUpdatedFriendsInfo(friendsIDs)

        return res.status(200).send({data:summonersObjects})
    } catch(error){
        return res.status(500).send({msg:'Error', error})
    }
}

export { getSummoner , getMainChampion, getFriendsUpdate }