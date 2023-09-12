import express from "express";
import AjoutProjet from "../controller/ajoutProjet.js";
const RouterProj = express.Router();

RouterProj.post("/ajout", AjoutProjet.createProjet);
RouterProj.get("/projetById/:id", AjoutProjet.ProjetById);
RouterProj.get('/projetAll', AjoutProjet.allProjet);
RouterProj.get('/projetStatut/statut', AjoutProjet.ProjetByStatut);

export default RouterProj;