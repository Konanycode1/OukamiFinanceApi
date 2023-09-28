import { verifyToken } from "../utils/token.js";
import jwt from 'jsonwebtoken'
import Express  from "express";

/**
 * 
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 * @param {Express.NextFunction} next 
 * @returns 
 */
export  const auth =  (req,res, next)=>{
    try {
        let token = req.headers.authorization.split(' ')[1];
        // console.log(req.headers)
        // console.log(token)
        let verify =  verifyToken(token);
        // let decodeToken = jwt.verify(token,process.env.JWT_SECRET)
        // req.user = decodeToken;
        // console.log("decode",decodeToken)
        if(verify){
            req.user = verify;
        }
        else{
            return res.redirect = "/login";
        }
        next();
    } catch (error) {
         res.redirect = "/login";
    }
   
}