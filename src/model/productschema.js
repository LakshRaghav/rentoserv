const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        brand: { type: String },
        car_model: { type: String },
        car_color: { type: String },
        car_model_year: { type: Number },
        price: { type: Number },
        availability: {type:Boolean },
        quantity:{ type: Number },
        rating:{ type: Number },
        driven:{ type: Number },
        type: { type: String },
        state:{ type:String},
        variant: { type: String },
        seats:{ type: Number },
        terrain: { type: String },
        image: { type: String }    
    }
)
module.exports = {
    ProductSchema:mongoose.model("products",ProductSchema)
}