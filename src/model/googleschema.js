const mongoose = require("mongoose");

const GoogleSchema = new mongoose.Schema(
    {
        name:{type:String},
        email:{type:String,index:true,unique:true,required:[true,"Please enter the email address"]},
        picture:{type:String},  
        order:[{
            order_id:{type:String},
            payment_id:{type:String}
        }],
        role:{type:String}    
    }
)
module.exports = {
    GoogleAuth:mongoose.model("google_profiles", GoogleSchema)
}