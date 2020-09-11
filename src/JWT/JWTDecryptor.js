import jsonwebtoken from 'jsonwebtoken'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '.env'})

}
const pub_key = "-----BEGIN RSA PUBLIC KEY-----MIICCgKCAgEAssgV1owoHE/MLleZUlIxi8mXBvdqOKiGDCjuSzWU+wJJCYiVXjsZxfY3WMRJN4BCMWkLEcXj51E/R5EMDPfq2ohfNn7hsEdQob8jZUyjL7gnPkiRmqLlLSKihON4qVWfZTiLxnEZVNJHV9mPoJBnsmsu89+NTjfTulpCdP8D+SUb06cRuD2yiRI+Wkg4zjAX8H+3SkAXMPoSTe/p8dDjjyxFVdqKoNjKnnxoRfMso3Y9rkYNRCu80kBNzxAISNGVkWpSf7WGYGxCT0+4S/rc4qiohtutUb+Voj85qYQwJaBQsZcvnM5K2hLES4SGdcniJPlcoGeEcCpGPrCAJQagU80kt0a7J/QerxCxUt2oBdEqgDgTjLZUoD5cf5VrUO5Vi0Kzl9kRXKxdLhT6BZYZOMsRoO2TU34NZyYkge5uUeOmzhANAMjEP5gaOSGJ/rY5LRe5BuUkcsghrpow2vrdLGvsHePM19l8secSiy4pG4/GsDq/SN/cUSzaxhKkWzppPv1V9y7ZAyNsdSPreRHxvhD0D2xw8OxztQM1FQIKRVA4KVP7yflNXNxjAbYitCGWqvMNjq//IaAsp5vxKOx7mEBio0Kszp4tqCAUxCNMPpoe3bACI8BmqdXLFWg5HGlj7Da5Y/UGjh7Op6jvs/e+9CbznQV3GNdRre5hzuXnP8ECAwEAAQ==-----END RSA PUBLIC KEY-----"

const JWTDecrypt = (token) => {
    let user = {}
    jsonwebtoken.verify(token,pub_key,{algorithm: ['RS256']},(err,payload)=>{
        if(err) {
            console.log(err)
            return
        }
        console.log(payload)
        user = {
            firstName:payload.firstName,
            lastName:payload.lastName,
            userName:payload.userName,
            googleId:payload.googleId,
            token:token
        }
    })

    return user

}

export default JWTDecrypt