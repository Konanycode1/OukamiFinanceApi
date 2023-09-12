import ajoutProjet from "../models/ajoutProjet";

class AjoutProjet{
    static async createProjet(req, res){
        try {
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
}