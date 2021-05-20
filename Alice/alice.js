require("dotenv").config()
const express = require("express"); 
const axios = require("axios");

const {
    getPrimitiveRoot,
    powerMod,
    getPrivateKey,
    modInverse
} = require("./methods"); 


const app = express();
app.use(express.json());

const clientName = process.env.CLIENT_NAME; 
const  publicKey = process.env.COMMON_PUBLIC_KEY; // P --> Large Prime Number
let primitiveRoot = getPrimitiveRoot(publicKey); // G --> generator, also gcd(g,p) should be 1. 
let privateKey = getPrivateKey(publicKey); //d --> between 2 and p-2
let exchangeKey = powerMod( primitiveRoot, privateKey, publicKey);
primitiveRoot = 11;
console.log(`
Public key  : ${publicKey}
Generator   : ${primitiveRoot}
ExchangeKey : ${exchangeKey}
Private key : ${privateKey}
`); 

const decrypt = (y1, y2) => {
    let data = (y2 * modInverse(Math.pow(y1,privateKey), publicKey)) % publicKey;
    return data; 
};

setTimeout (async()=>{ 
    console.log(`Sending publicKey(p) ${publicKey}, generator(g) ${primitiveRoot} and exchangeKey(e) ${exchangeKey} to other party`);
    try { 
        let res = await axios.post(`${process.env.FRIEND_URI}/exchangeKey`,{
            p : publicKey,
            g : primitiveRoot, //generator
            e : exchangeKey
        });
        res = res.data; 

        let { y1, y2 } = res;
        console.log(`Reply : y1 = ${y1}, y2 = ${y2}`); 

        const decryptedMessage = decrypt(y1,y2);
        console.log(`Decrypted message : ${decryptedMessage}`); 
    }  catch(err) {
        console.log(err); 
    }
}, 5000);  

app.listen(process.env.CLIENT_PORT,()=>{
    console.log(`${process.env.CLIENT_NAME} listening on port ${process.env.CLIENT_PORT}`)
})

