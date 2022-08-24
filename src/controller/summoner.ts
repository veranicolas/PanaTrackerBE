import axios from "axios"
import { Request, Response } from "express"

const URL = 'https://la2.api.riotgames.com'

const getSummoner = async (req:Request ,res:Response) =>{

    try{
        const { data } = await axios.get(`${URL}/lol/summoner/v4/summoners/by-name/${req.query.name}?api_key=${process.env.RIOT_API}`)
        return res.status(200).send({...data})
    } catch(error){
        return res.status(400).send({
            message:'Error',
            error
        })
    }
}

export { getSummoner }