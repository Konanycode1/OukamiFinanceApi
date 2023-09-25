import  express  from "express";
import Bailleur from "../controller/bailleur.js";
import { auth } from "../midlleware/withAuth.js";
const RouterBail = express.Router();
RouterBail.post("/bailleur",Bailleur.create);
RouterBail.put("/bailleur/:id",auth,Bailleur.editeBail)
RouterBail.delete("/bailleur/:id",auth,Bailleur.Delete);
RouterBail.get("/valide/:id",auth,Bailleur.validateProjet)
RouterBail.get('/getBailleur',auth, Bailleur.getBailleur)
RouterBail.post("/log",Bailleur.login)
export default RouterBail