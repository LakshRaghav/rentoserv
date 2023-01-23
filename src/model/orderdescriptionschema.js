const mongoose = require("mongoose");


const OrderDescriptionSchema = new mongoose.Schema(
    {
        order_id:{type:String,unique:true},    
        address:{type:String},        
        name:{type:String},
        address:{type:String},
        price:{type:Number},
        Drop: {type:String},
        Pickup: {type:String},
        Age: {type:Number},
        Adhaar: {type:Number},
        val1: {type:String},
        val2: {type:String}  
    }
)
module.exports = {    
    OrderDescription:mongoose.model("order_descriptions", OrderDescriptionSchema)
}