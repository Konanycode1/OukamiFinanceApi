import { MongooseError } from "mongoose";
import ajoutProjet from "../models/ajoutProjet.js";
import bailleur from "../models/bailleur.js";
import { tokenSend } from "../utils/token.js";


class Admin{
    static async logAdmin(req,res){
        try {
            const {user,password} = req.body;
            if(user.toLowerCase() == "admin"  && password == "admin"){
                res.cookie("admin", "admin");
                res.status(200)
                .json({
                    status:true,
                    message:"connexion encours"
                });
                return
            }
            else{
                res.status(404)
                .json({
                    status:false,
                    message:"Identifiant incorrecte"
                }) 
                return
            }
            
        } catch (e) {
            if( e instanceof MongooseError) throw new Error("Erreur de server Mongose:",e.message)
            res.status(500)
            .json({
                status:false,
                message:e.message
            })
        }
        
    }
    static async listeBailleur(req,res){
        try {
            const {_id}= req.user
            if(!_id) return res.status(400).json({status:false,message:"utilisateur incorrect"})
            const liste = await bailleur.find();
            res.status(201)
            .json({
                status:true,
                message:liste
            })
        } catch (e) {
            if( e instanceof MongooseError) throw new Error("Erreur de server Mongose:",e.message)
            res.status(500)
            .json({
                status:false,
                message:e.message
            })
        }
    }
    static async listeBailleurById(req,res){
        try {
            let {id} = req.params
            const {_id}= req.user
            if(id !== _id) return res.status(400).json({status:false,message:"utilisateur incorrect"})
           let liste = await bailleur.findById(_id);
            res.status(201)
            .json({
                status:true,
                message:liste
            })
        } catch (e) {
            if( e instanceof MongooseError) throw new Error("Erreur de server Mongose:",e.message)
            res.status(500)
            .json({
                status:false,
                message:e.message
            })
        }
    }
}
export default Admin;
