const bcrypt = require("bcryptjs");
require('dotenv').config({path:"../.env"});
const jwt = require('jsonwebtoken');
module.exports = {
    emailValidation:function(emailString)
    {
        return String(emailString)
        .toLowerCase()
        .match(/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/);
    },
    encrypt:async function(password)
    {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return password
    },
    compPassword:function(passString,dbString)
    {
        const response = bcrypt.compareSync(passString,dbString);
        return response;
    },
    generateToken:function(bindData)
    {
        return jwt.sign(bindData,process.env.SECRET_KEY,{expiresIn:'30d'})
    },
    decodeToken:function(token)
    {
        return jwt.decode(token);
    }

}