import jwt  from "jsonwebtoken";

/**
 * 
 * @param {String} user 
 * @returns 
 */

export const token = (user)=>{
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET) throw new Error("Code sécret introuvable !!!")
        let tokenKey = jwt.sign(user, JWT_SECRET, {expiresIn: 3600*24});
        return tokenKey;
    } catch (e) {
        console.log("Error for a token : ",e)
        return false
    }
}

/**
 * 
 * @param {String} tokenSend 
 * @returns 
 */
export const verifyToken = (tokenSend)=>{
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET) throw new Error("Code sécret introuvable !!!")
        return jwt.verify(tokenSend, JWT_SECRET);
    } catch (e) {
        console.log("Error for a token : ",e)
        return false
    }

}