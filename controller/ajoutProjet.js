import { MongooseError } from "mongoose";
import ajoutProjet from "../models/ajoutProjet.js";


class AjoutProjet{
    static async createProjet(req, res){
        try {
            // console.log(req.body)
            const {image, ...body} = req.body;
            await ajoutProjet.create({
                image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                ...body
            })
            res.status(200).json({
                status:true,
                message: "Projet encours de validation !!"
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
    static async allProjet(req,res){
        try {
             const projet = await ajoutProjet.find(); 
             res.status(201)
                .json({
                    status: true,
                    message:projet 
                })
        } catch (e) {
            res.status(500)
                .json({
                    status: false,
                    message: e.message
                })
        }
    }
    static async ProjetById(req,res){
        try {
            const {id} = req.params;
            let projet = await ajoutProjet.findById(id);
            res.status(201)
            .json({
                status: true,
                message:projet 
            })

        } catch (e) {
            if( e instanceof MongooseError) throw new Error("Erreur de server Mongose:",e.message)
            res.status(500)
                .json({
                    status: false,
                    message: e.message
                })
        }
    }
    static async ProjetByStatut(req,res){
        try {
            const {statut} = req.params;
           let projet =  await ajoutProjet.findOne({statut}); 
            res.status(201)
            .json({
                status: true,
                message:projet 
            })
        } catch (e) {
            if( e instanceof MongooseError) throw new Error("Erreur de server Mongose:",e.message)
            res.status(500)
                .json({
                    status: false,
                    message: e.message
                })
        }
    }
   
}
export default AjoutProjet;