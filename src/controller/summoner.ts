import axios from "axios"
import { Request, Response } from "express"

const URL = 'https://la2.api.riotgames.com'

const getRankData = async (id:string) =>{

    const {data:rankedData} = await axios.get(`${URL}/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_API}`)

    if(rankedData.length){
        return rankedData
    } else {
        return 'unranked'
    }
}

const getSummoner = async (req:Request ,res:Response) =>{

    try{
        const { data } = await axios.get(`${URL}/lol/summoner/v4/summoners/by-name/${req.query.name}?api_key=${process.env.RIOT_API}`)
        const rankedData = await getRankData(data.id)
        if(rankedData !== 'unranked'){
            const rankImageURL = `https://opgg-static.akamaized.net/images/medals_new/${rankedData[0].tier.toLowerCase()}.png`
            return res.status(200).send({...data, rankedData})
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

export { getSummoner }