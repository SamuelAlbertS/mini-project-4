import { verifyToken } from "../helper/token.js";

export async function verifyUser(req, res, next){
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) throw ({message : "Unathorizated"});
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({type:"error", message:error?.message,data:null})
    }
}

export async function verifyAdmin(req, res, next){
    try{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token) throw ({message : "Unathorizated"});
        const decoded = verifyToken(token);
        if(decoded?.role!==1) throw ({message : "Restricted"});
        next();
    }catch(error){
        return res.status(403).json({type:"error",message:error?.message,data:null})
    }
}