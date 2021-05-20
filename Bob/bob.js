require("dotenv").config()
const express = require("express"); 
const axios = require("axios");

const {
    powerMod
} = require("./methods"); 


const app = express();
app.use(express.json());

app.post("/exchangeKey",(req,res) => {
    const {
        p, // public key
        g, // generator
        e  // exchange key
    } = req.body; 
    console.log(`Received keys p=${p} g=${g} e=${e}`); 
    
    let message = 10; 
    let randomInt = 7;
    let y1 = powerMod(g, randomInt, p);
    let y2 = message * powerMod(e , randomInt, p); 
    console.log(`
    message to send : ${message},
    encrypted data : y1 = ${y1}, y2 = ${y2}
    `)
    return res.status(200).json({
        y1 : y1,
        y2 : y2
    })
})

app.listen(process.env.CLIENT_PORT,()=>{
    console.log(`${process.env.CLIENT_NAME} listening on port ${process.env.CLIENT_PORT}`)
})

