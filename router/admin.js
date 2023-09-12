import  express  from "express";
import Admin from "../controller/admin.js";
import { auth } from "../midlleware/withAuth.js";


const RouterAdmin = express.Router();

RouterAdmin.post("/logAdmin", Admin.logAdmin);
RouterAdmin.get("/listeBailleur",auth, Admin.listeBailleur);
RouterAdmin.get("/listeBailleurById",auth, Admin.listeBailleurById);

export default RouterAdmin;

