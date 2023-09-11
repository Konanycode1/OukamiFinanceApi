import express from "express"
import cors from "cors"
import cookieParser  from "cookie-parser"
import { connectDB } from "./config/db.js";
import path from 'path'
import { fileURLToPath } from 'url';
import { config } from "dotenv";
const  app = express();

config({
    path:path.join(process.cwd(),'.env')
})


app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static("/images"))

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/images" ,express.static( path.join(__dirname,'images') ))

let port = process.env.PORT || 3000
connectDB()
.then(()=>{
    app.listen(port, ()=>{
        console.log("server lancé !!!")
    })
})
.catch((e)=>{
    console.log("erreur",e.message)
})

