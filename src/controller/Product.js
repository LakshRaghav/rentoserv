require("../config/db");
const mongoose = require("mongoose");
const Product = require("../model/productschema");

module.exports = {
    postCarData:async function(data) {
        const res = {}
        try {
            const user = new Product.ProductSchema(data);
            const result = await user.save();
            console.log(result)
            res.status = "success";
            res.message = "data saved successfully";
            res.data = result;
            return res;
        } catch (error) {
            res.status = "failed"
            console.log(error)
            if (error.name == "ValidationError") {
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
                res.error = error;
                
              }
              return res;
        }
    },
    getcardata:async function(data) {
        const res = {}
        try {
            const result = await Product.ProductSchema.find({state:data})
            res.status = "success";
            res.message = "Data has been found successfully";
            res.data = result;
            return res;
        }catch(error) {
            res.status = "failed"
            console.log(error)
            if (error.name == "ValidationError") {
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
                res.error = error;                
              }
              return res;
        }
    },
    getoffercardata:async function(data) {
        const res = {}
        try {
            const result = await Product.ProductSchema.find({$and:[{state:data},{rating:{$eq:5}}]})
            res.status = "success";
            res.message = "Data has been found successfully";
            res.data = result;
            return res;
        }catch(error) {
            res.status = "failed"
            console.log(error)
            if (error.name == "ValidationError") {
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
                res.error = error;                
              }
              return res;
        }
    },
    getdata:async function(data) {
        const res = {}
        try {
            const result = await Product.ProductSchema.find({_id:data})
            res.status = "success";
            res.message = "Data has been found successfully";
            res.data = result;
            return res;
        }catch(error) {
            res.status = "failed"
            console.log(error)
            if (error.name == "ValidationError") {
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
                res.error = error;                
              }
              return res;
        }
    }
}
