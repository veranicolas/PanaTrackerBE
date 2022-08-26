import axios from "axios"
import { Request, Response } from "express"

import { getRankData, getHighestMasteries } from "../services/summonerServices"

const BASE_URL = 'https://la2.api.riotgames.com'

const getMainChampion = async (req:Request, res:Response) =>{

    try{
        const { data } = await axios.get('http://ddragon.leagueoflegends.com/cdn/12.16.1/data/en_US/champion.json')

        //@ts-ignorets-ignore
        const masterieData:any = await getHighestMasteries(req.query.name)
    
        const mainChampion = Object.keys(data.data)
            .map((champion)=>{
                if(data.data[champion].key == masterieData.data[0].championId){
                    return data.data[champion]
                }
            })

        return res.status(200).send({...mainChampion})

    } catch(error){
        return res.status(500).send({message:'Error', error})
    }
}

const getSummoner = async (req:Request ,res:Response) =>{

    try{
        const { data } = await axios.get(`${BASE_URL}/lol/summoner/v4/summoners/by-name/${req.query.name}?api_key=${process.env.RIOT_API}`)
        const rankedData = await getRankData(data.id)
        if(rankedData !== 'unranked'){
            const rankImageURL = `https://opgg-static.akamaized.net/images/medals_new/${rankedData[0].tier.toLowerCase()}.png`
            return res.status(200).send({...data, rankedData, rankImage:rankImageURL})
        } else {
            return res.status(200).send({...data, rank: 'unranked'})
        }
    } catch(error){
        return res.status(404).send({
            message:'Error',
            error
        })
    }
}

export { getSummoner , getMainChampion}