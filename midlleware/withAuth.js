import { verifyToken } from "../utils/token.js";
import Express  from "express";

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 * @returns 
 */
export  const auth = (req,res, next)=>{
    let token = req.cookies.token;
    let verify = verifyToken(token);
    if(verify){
        req.user = verify;
    }
    else{
        return res.redirect = "/login";
    }
    next();
}