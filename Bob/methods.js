const getPrimitiveRoot = (prime) => {

    for(let i = 2; i < prime ; i++) {
        let x = 1; 
        let st = new Set(); 
        for(let j = 1; j < prime; j++) { 
            x = x * i ; 
            st.add(x % prime); 
        }
        if(st.size === prime - 1){ 
            return i; 
        }
    }
    return -1; 
}


const poww = (a,b,m) => {
    let ans = 1; 
    if(b == 0) return 1; 
    let hb = Math.floor(b/2); 
    let x = poww(a,hb,m); 
    if(b%2){
        ans = ( ans * x ) % m; 
    }
    x = (x * x) % m;
    ans = (x * ans) % m; 
    return ans; 
     
}

const powerMod = (a, b, m) => { // g^a % p 
    let ans = poww(a, b, m);
    return ans; 
}

function getRandomInt(max) { // return [0,max-1] 
    return Math.floor(Math.random() * max); 
}
  
const getPrivateKey = (publicKey) => {
    let x = getRandomInt(publicKey-1); 
    if(x > 1) return x;
    else return getPrivateKey(publicKey); 
}

function modInverse(a, m)
{
    for(let x = 1; x < m; x++)
        if (((a % m) * (x % m)) % m == 1)
            return x;
}

module.exports = { 
    getPrimitiveRoot,
    powerMod,
    getPrivateKey,
    modInverse
}; 