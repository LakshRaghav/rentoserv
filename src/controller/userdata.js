const Constant = require("../constant/Constant");
const UserSchema = require("../model/userSchema");
const GoogleSchema = require("../model/googleschema");
const OrderDescriptionSchema = require("../model/orderdescriptionschema");
module.exports = {
    getUserData:async function(data){
        try{
            const res = {};
            const requiredata = {};
            const tokendata = Constant.decodeToken(data);
            if(tokendata)
            {
                const userdata = await UserSchema.UserAuth.findOne({_id:tokendata.userId})
                if(userdata)
                {
                    res.status="success"
                    res.message="Found your data"
                    res.email = userdata.email
                    res.first_name = userdata.first_name
                    res.address = userdata.address
                    res.phone = userdata.phone
                    res.picture = userdata.picture
                }
                else{
                    res.status = "failed"
                    res.message = "Couldn't find your data"
                }
                return res
            }
        }catch(error){
            res.status = "failed"
            if (error.name == "ValidationError") {
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
                res.error = errors;
              }
              return res;
        }
    },    
    updateUserOrder:async function(data){
        const res ={};
        try{           
            const order = await UserSchema.UserAuth.updateOne({email:data.email},{$push:{order:{order_id:data.order_id,payment_id:data.payment_id}}})
            console.log(order)
            if(order.acknowledged)
            {
                res.status = "success";
                res.message = "saved successfully in database";
            }
            else{
                res.status = "failed";
                res.message = "Failure";
            }
                                   
            return res;
        }catch(error){
            res.status = "failed"
            if (error.name === "ValidationError") {
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
                res.error = error;
              }
              return res;
            }      
    },
    updateGoogleUserOrder:async function(data){
        const res ={};
        try{           
            const order = await GoogleSchema.GoogleAuth.updateOne({email:data.email},{$push:{order:{order_id:data.order_id,payment_id:data.payment_id}}})
            console.log(order)
            if(order.acknowledged)
            {
                res.status = "success";
                res.message = "saved successfully in database";
            }
            else{
                res.status = "failed";
                res.message = "Failure";
            }
                                   
            return res;
        }catch(error){
            res.status = "failed"
            if (error.name === "ValidationError") {
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
                res.error = error;
              }
              return res;
            }      
    },
    updateOrderDescription:async function(data){
        const res ={};
        console.log(data)
        try{           
            const database= new OrderDescriptionSchema.OrderDescription(data);
            const result = await database.save();
            console.log(result)
            if (result) {
                res.status = "success";
                res.message = "Successfully order description saved";                 
            }
            else{
                res.status = "failed";
                res.message = "There was an error";                    
            }            
            return res;
        }catch(error){
            res.status = "failed"
            if (error.name === "ValidationError") {
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
                res.error = error;
              }
              return res;
            }      
    },
    getInvoiceUserData:async function(id){
        const res = {}; 
        console.log(id)
        try{                      
            const userdata = await UserSchema.UserAuth.aggregate([
                // {
                // $match:{
                //     "order":{
                //          $elemMatch:{order_id:id}}
                //     }
                // },
                {$lookup:{
                    from: "order_descriptions",
                    let: {"oid": "$order_id"},
                    pipeline:[{
                        $match:{order_id:id
                            ,$expr:{
                                $eq:["$order.order_id", "$$oid"]
                                }}
                        }],
                    as: "order_detail"
                    }
                }
            ])
            if(userdata)
            {
                res.status="success"
                res.message="Found your data"
                res.data = userdata
            }
            else{
                res.status = "failed"
                res.message = "Couldn't find your data"
            }
            return res           
        }catch(error){
            res.status = "failed"
            if (error.name == "ValidationError") {
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
                res.error = errors;
              }
              return res;
        }
    },
    getInvoiceGoogleUserData:async function(id){
        const res = {};
        try{                      
            const userdata = await GoogleSchema.GoogleAuth.aggregate([
                {
                $match:{
                    "order":{
                         $elemMatch:{"order_id":id}}
                    }
                },
                {$lookup:{
                    from: "order_descriptions",
                    let: {"oid": "$order_id"},
                    pipeline:[{
                        $match:{$expr:{
                                $eq:["$order.order_id", "$$oid"]
                                }}
                        }],
                    as: "order_detail"
                    }
                }
            ])
                if(userdata)
                {
                    res.status="success"
                    res.message="Found your data"
                    res.email = userdata.email
                    res.first_name = userdata.name
                    res.picture = userdata.picture
                }
                else{
                    res.status = "failed"
                    res.message = "Couldn't find your data"
                }
                return res
        }catch(error){
            res.status = "failed"
            if (error.name == "ValidationError") {
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
                res.error = errors;
              }
              return res;
        }
    },
}
