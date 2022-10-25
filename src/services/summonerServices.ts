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

const getSummonerDataFormat = (rankedData:any, data:any) =>{
    if(rankedData !== 'unranked'){
        let rankImageURL
        rankedData.map((queue:any)=>{
            if(queue.queueType === "RANKED_SOLO_5x5"){
                rankImageURL = `https://opgg-static.akamaized.net/images/medals_new/${queue.tier.toLowerCase()}.png`
            }
        })

        return {...data, rankedData, rankImage:rankImageURL}
    } else {
        return {...data, rank: 'unranked'}
    }
}

const getUpdatedFriendsInfo = async (friendsIDs:any[]) =>{

    try{
        const friendsDataPromises = friendsIDs.map((item)=>{
            return axios.get(`${BASE_URL}/lol/summoner/v4/summoners/by-puuid/${item}?api_key=${process.env.RIOT_API}`)
        })
        const results = (await Promise.all(friendsDataPromises))
            .map((result)=>{
                return result.data
            })
        
        const resultsMapped = await Promise.all(results.map(async(item:any)=>{
            const rankedData = await getRankData(item.id)
            const finalObject = getSummonerDataFormat(rankedData, item)
            return{
                ...finalObject
            }
        })) 

        return resultsMapped
    } catch(error){
        console.log(error)
    }
}

export { getRankData , getHighestMasteries, getSummonerDataFormat, getUpdatedFriendsInfo }