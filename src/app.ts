import express, { Express, Request, Response} from "express";
import 'dotenv/config'

const app:Express = express()

app.use(express.json())

app.get('/test', (req:Request, res:Response)=>{
    res.status(200).send({message:'This is working fine'})
})

export { app }