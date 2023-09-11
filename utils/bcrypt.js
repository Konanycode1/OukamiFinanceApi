import bcrypt, { compare, hash } from "bcrypt"

/**
 *  @param {String} pass
 */
export const crypt = async (pass)=>{
    return await hash(pass, await bcrypt.genSalt())
}
/**
 * 
 * @param {Sting} to 
 * @param {String} from 
 * @returns 
 */
export const compar = async (to, from)=>{
    try {
        return await compare(to,from)
    } catch (e) {
        console.log(e.message)
    }
}