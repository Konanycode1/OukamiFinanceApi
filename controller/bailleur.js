import { MongooseError } from "mongoose"
import bailleur from "../models/bailleur.js"
import { compar, crypt } from "../utils/bcrypt.js";
import { tokenSend } from "../utils/token.js";
import ajoutProjet from "../models/ajoutProjet.js";


class Bailleur {
    static async create(req,res){
        try {
            const {email,numero,password, ...body} = req.body;
            const user = await bailleur.findOne({email:email});
            if(user){
                res.status(401).json({
                    status: false,
                    message: "Utilisateur existe déjà !!"
                })
                return 
            }
            else{
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
            }
            
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
            const {id} = req.params
            const {_id}= req.user
            console.log("id:",id)
            console.log("_id:",_id)
            if(id !== _id) return res.status(400).json({status:false,message:"utilisateur incorrect"})
            let bail = await bailleur.findOne({_id})
            if(bail){
                const { ...body}  = req.body;
                let verify = await bailleur.findOne({email: bail.email})
                if(!verify){
                    res.status(400).json({
                        status: false,
                        message:"email introuvable !!"
                    })
                    return
                }
                await bail.updateOne({...body})
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
            let {id} = req.params
            const {_id}= req.user
            if(id !== _id) return res.status(400).json({status:false,message:"utilisateur incorrect"})
            const user = await bailleur.findOne({_id:id});
            if(!user){
                res
                .status(400)
                .json({
                    status: false,
                    message: "Compte introuvable !!"
                })
                return
            }
            await user.deleteOne({_id:_id})
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
            const {email, password} = req.body;
            let bail = await bailleur.findOne({email:email})
            if(!bail){
                res.status(401)
                    .json({
                        status:false,
                        message: "Email introuvable"
                    })
                return; 
            }
            console.log(bail.password)
            const userBail = bailleur.findOne({password: await compar(password, bail.password)});
            if(!userBail){
                res
                    .status(401)
                    .json({
                        status: false,
                        message: "Mot de passe incorrect !!!"
                    })
            }
            res.cookie("token", tokenSend(bail.toObject()))
            res
            .status(201)
            .json({
                status: true,
                message: "Connexion encours !!!"
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
    static async validateProjet(req,res){
        try {

            let {id} = req.user;
            const {idProj} = req.params
            if(id !== idProj) return res.status(400).json({status:false,message:"utilisateur incorrect"})
            const user = await bailleur.findOne({_id: id});
            if(!user){
                res.status(401)
                .json({
                    status: false,
                    message: "Compte introuvable"
                })
            }
            let ajout = await ajoutProjet.findOne({_id:idProj});
            if(ajout.statut == true){
                res.status(404)
                .json({
                    status: false,
                    message: "Projet encours de Financement !!"
                })
            }
            await ajout.updateOne({statut:true})
            res.status(201)
                .json({
                    status: true,
                    message: "Votre demande est encours d'analyse"
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