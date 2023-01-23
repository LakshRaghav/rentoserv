const nodemailer = require("nodemailer");

module.exports= {main:async function(request,response,next){
const data = {...request.body}
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "lakshayraghav1571@gmail.com",
      pass: "mykridrulfigsqkp",
    },
});
let info = await transporter.sendMail({
    from: `${request.body.email}`,
    to: "raghavlakshay1571@gmail.com",
    subject: `Mail from User ${request.body.first_name}`,
    text: `${request.body.message}`   
});
transporter.sendMail(info,(error)=>{
    if(error)
    {
        data.status = "failed"
        data.message = "error occured"
    }
    else{
        data.status = "success"
        data.message = "Your Mail has successfully been received . Will connect to you soon."
    }
    request.body = data;
    next()
})
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
}