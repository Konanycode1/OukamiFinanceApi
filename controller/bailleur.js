import { MongooseError } from "mongoose"
import bailleur from "../models/bailleur.js"
import { compar, crypt } from "../utils/bcrypt.js";
import { token } from "../utils/token.js";

class Bailleur {
    static async create(req,res){
        try {
            const {email,numero,password, ...body} = req.body;
            const user = bailleur.findOne({ email: email, numero: numero});
            if(user){
                res.status(401).json({
                    status: false,
                    message: "Utilisateur existe déjà !!"
                })
                return 
            }
            const bail = await bailleur.create({
                email: email,
                numero: numero,
                password: await crypt(password),
                ...body
            })
            res.status(200).json({
                status:true,
                message: bail.toObject({ password: undefined})
            })
        } catch (e) {
            if( e instanceof MongooseError) throw new Error("Erreur de server Mongose:",e.message)
            res.status(500).json({
                status: false,
                message: e.message
            })
        }
    }
    static async editeBail(req, res){
        try {
            let {id} = req.param

            let bail = bailleur.findOne({_id: id})
            if(bail){
                const {email , ...body}  = req.body;
                let verify = bailleur.findOne({email: email})
                if(!verify){
                    res.status(400).json({
                        status: false,
                        message:"email introuvable !!"
                    })
                    return
                }
                await bail.update({...body})
                res.status(201).json({
                    status: true,
                    message: "Compte modifié !!!"
                })
            }
            else{
                res.status(400).json({
                    status: false,
                    message: e.message
                })
            } 
        } catch (e) {
            if( e instanceof MongooseError) throw new Error("Erreur de server Mongose:",e.message)
            res.status(500).json({
                status: false,
                message: e.message
            })
        }
    }
    static async Delete(req, res){
        try {
            const {id} = req.param;
            const user = bailleur.findOne({_id:id});
            if(!user){
                res
                .status(400)
                .json({
                    status: false,
                    message: "Compte introuvable !!"
                })
                return
            }
            await user.delete({_id:id})
            res
            .status(201)
            .json({
                status: true,
                message:"Compte supprimé !!"
            });
        } catch (e) {
            if( e instanceof MongooseError) throw new Error("Erreur de server Mongose:",e.message)
            res
            .status(500)
            .json({
                status: false,
                message: e.message
            })
        }
        
    }
    static async login(req, res){
        try {
            const {email, newPassword} = req.body;
            let bail = bailleur.findOne({email:email})
            if(!bail){
                res.status(401)
                    .json({
                        status:false,
                        message: "Email introuvable"
                    })
                return; 
            }
            const userBail = bailleur.findOne({password: await compar(newPassword, bail.password)});
            if(!userBail){
                res
                    .status(401)
                    .json({
                        status: false,
                        message: "Mot de passe incorrect !!!"
                    })
            }
            res.cookie("token", token(userBail.toObject()))
            res
            .status(201)
            .json({
                status: true,
                message: "Mot de passe incorrect !!!"
            })

        } catch (e) {
            if( e instanceof MongooseError) throw new Error("Erreur de server Mongose:",e.message)
            res
            .status(500)
            .json({
                status: false,
                message: e.message
            })
        }
    }

}

export default Bailleur;