import app from "./app.js";
import connectdb from "../src/db/index.js";
import dotenv from 'dotenv'
dotenv.config();
const port =process.env.PORT
connectdb();
app.listen( port,(req,res)=>{

console.log(`app listening on port ${port}`)
})