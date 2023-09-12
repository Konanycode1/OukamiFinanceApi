import {Schema,model} from "mongoose";

const bailleurSchema = Schema({
    nom : {type: String, required: true},
    prenom : {type: String, required: true},
    numero : {type: String, required: true},
    email : {type: String, required: true},
    societe : {type: String, default:"No found"},
    fonction : {type: String, required: true},
    ville : {type: String, required: true},
    password: {type:String, required:true},
    pays : {type: String, required: true},
    projet: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "projet"
            }
        ]
    }
})
export default model("bailleur",bailleurSchema);