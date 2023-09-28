import { Schema, model } from "mongoose";

const ajoutSchema = Schema({
    nom: { type: String, required: true},
    prenom:{ type: String, required: true},
    email: { type:String, required:true},
    numero: {type:String,required:true},
    nomProjet: {type:String, required:true},
    description: {type:String, required: true},
    budget:{type:String, required:true},
    durerProjet: {type:String, required:true},
    image:{type:String, required:true},
    numeroTeleDecla:{type:String, required:true},
    date: {type:Date, default:Date.now()},
    statut: {type:String, default: false},
    finance: {
        type: Schema.Types.ObjectId,
        default: null
    }
})
export default model("projet",ajoutSchema)