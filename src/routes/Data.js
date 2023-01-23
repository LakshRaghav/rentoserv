const express = require("express");
const upload = require("../middleware/UploadMiddleware");
const router = express.Router();
const product = require("../controller/Product")

router.get("/cardetail/",async (request,response)=>{
    const data = request.query.state
    const  result = await product.getcardata(data);
    response.json(result);
 })
 router.get("/offercardetail/",async (request,response)=>{
   const data = request.query.state
   const  result = await product.getoffercardata(data);
   response.json(result);
})
router.get("/mycardata/",async (request,response)=>{
   const data = request.query.cars;
   const  result = await product.getdata(data);
   response.json(result);
})
router.post("/cardata",upload,async (request,response)=>{
   const body = request.body;
   body.image = request.file.filename;
   const  result = await product.postCarData(body);
   response.json(result);
})
module.exports = router;