import express, { Express, Request, Response} from "express";
import 'dotenv/config'

const app:Express = express()

const PORT = process.env.PORT || 3000

app.get('/test', (req:Request, res:Response)=>{
    res.status(200).send({message:'This is working fine'})
})

app.listen(PORT, ()=>{
    console.log(`Server up in port ${PORT}`)
})