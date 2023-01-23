const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        first_name:{type:String},
        email:{type:String,index:true,unique:true,required:[true,"Please enter the email address"]},
        password:{type:String,index:true,required:[true,"Password not received"]},
        picture:{type:String},
        phone:{type:Number,unique:true},
        order:[{
            order_id:{type:String},
            payment_id:{type:String}
        }],
        address:{type:String},
        role:{type:String,required:true},       
    }
)
module.exports = {    
    UserAuth:mongoose.model("profiles", UserSchema)
}