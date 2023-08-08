import fs from "fs";

export function apiKeyValidator (req, res, next){
    const apiKey = req.headers["x-api-key"]
    
    const apiKeys = JSON.parse(fs.readFileSync("./json/api.keys.json","utf-8"))

    const apiKeyIsValid = apiKeys.find(item => item.key === apiKey);

    if(!apiKeyIsValid){
        return res.status(401).json({message : "Invalid API Key"})
    }

    next()
}