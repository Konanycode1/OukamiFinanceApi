import ajoutProjet from "../models/ajoutProjet";

class AjoutProjet{
    static async createProjet(req, res){
        try {
            const {image, ...body} = req.body;
            
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