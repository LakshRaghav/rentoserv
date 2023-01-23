const server = require("./app");
require('dotenv').config();

server.listen(process.env.PORT,()=>{
    console.warn(`server started on port ${process.env.HOST}:${process.env.PORT}`)
})
