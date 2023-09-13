import express from "express";
import AjoutProjet from "../controller/ajoutProjet.js";
import multer from "../midlleware/multer.js";
const RouterProj = express.Router();


RouterProj.post("/ajout",multer.single('image'), AjoutProjet.createProjet);
RouterProj.get("/projetById/:id", AjoutProjet.ProjetById);
RouterProj.get('/projetAll', AjoutProjet.allProjet);
RouterProj.get('/projetStatut/:statut', AjoutProjet.ProjetByStatut);

export default RouterProj;