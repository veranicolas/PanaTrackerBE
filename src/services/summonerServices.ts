import axios from "axios"

const BASE_URL = 'https://la2.api.riotgames.com'

const getRankData = async (id:string) =>{

    const {data:rankedData} = await axios.get(`${BASE_URL}/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_API}`)

    if(rankedData.length){
        const tftRegex = new RegExp(/TFT/)
        const riftData = rankedData.filter((queue:any)=>{
            return tftRegex.test(queue.queueType) === false
        })
        return riftData
    } else {
        return 'unranked'
    }
}

const getHighestMasteries = async (summonerId:string) =>{

    const data = await axios.get(`${BASE_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${process.env.RIOT_API}`)

    return data
}

export { getRankData , getHighestMasteries }