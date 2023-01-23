require("../config/db");
const Constant = require("../constant/Constant");
const UserSchema = require("../model/userSchema")
const GoogleSchema = require("../model/googleschema")
const ab = require("../routes/Auth");
module.exports = {
    signUp: async function(signupData){
        const res={};
        try
        {console.log(signupData)
            if(Constant.emailValidation(signupData.email))
            {
                signupData.password = await Constant.encrypt(signupData.password)
                const data =  await UserSchema.UserAuth.findOne({email:signupData.email})  
                if(data == null)
                {
                    const database = new UserSchema.UserAuth(signupData);
                    const result = await database.save();
                    
                    if (result) {
                        const t = Constant.generateToken({first_name:result.first_name,userId:result._id.toString()});
                        res.status = "success";
                        res.message = "Successfully created an account";
                        res.token = t;                    
                    }
                    else{
                        res.status = "failed";
                        res.message = "There was an error";                    
                    }
                }
                else if(data!=null){
                    res.status="failed";
                    res.message="User Account already exists !! Please Login";
                }
                return res;
            }
            else{
                res.status = "failed";
                res.message = "Wrong Email";
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
    login: async function (logindata) {
        const res = {};
        try{
          const data =  await UserSchema.UserAuth.findOne({email:logindata.email})
                if(data){                
                    if(Constant.compPassword(logindata.password,data.password))
                    {
                        const token = Constant.generateToken({first_name:data.first_name,userId:data._id.toString()})
                        res.message = "successfully logged in"
                        res.status = "success"
                        res.token = token
                    }
                    else {                    
                        res.status = 'failed'
                        res.message = 'Password is invalid'         
                    }                
                    return res
                }
                else{
                    res.status='failed';
                    res.message='Invalid Email';
                }
                return res                
        }catch(error){
            res.status = "failed"
            if (error.name === "ValidationError") {
                let errors = {};
                Object.keys(error.errors).forEach((key) => {
                  errors[key] = error.errors[key].message;
                });
                res.error = error;
              }
              return res
        }               
    },
    google_login: async function (ticket,tokenId) {
        const res = {};       
        const { name, email, picture } = ticket.getPayload();
        try{
            if (ticket.payload.email_verified){
            const data = await GoogleSchema.GoogleAuth.findOne({ email: ticket.payload.email},{name:1,userId:1})
            const t =Constant.generateToken({mongo_id:data._id.toString()})
                if(data == null)
                {
                    const user = new GoogleSchema.GoogleAuth({name,email,picture});
                    const pass  = await user.save();                  
                        res.status = 'success',
                        res.message = 'Authentication Success',
                        res.token = t                   
                }
                else if(data != null){                
                    res.status = 'success',
                    res.message = 'Authentication Success',
                    res.token = t
                }
                return res;
            }        
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
    }        
}  

