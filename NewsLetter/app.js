const express=require("express")
const bodyParser=require("body-parser")
const request=require("request")
const http=require("https")
const { options } = require("request")
const app=express()

// app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/SignUp.html")
})



app.post("/",(req,res)=>{
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;
    console.log(firstname,lastname,email)
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };

    //var data = JSON.stringify(data)

    console.log(data);
    console.log(JSON.stringify(data));

    var jsonData=JSON.stringify(data)

    // console.log(jsonData);

    const url="https://us18.api.mailchimp.com/3.0/lists/41282b4bf0"
    const options={
        method:"POST",
        auth:"prkskrs:4a9e0299af97d44216af7682106cd262-us18 "

    }

    const request=http.request(url,options,function(response){
        if(response.statusCode===200){
            res.send("Successfully Subscribed")
        }
        else{
            res.send("there is an error with signing up try again letter!")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData)
    request.end()
    // res.send("Responded!")
})

app.listen(process.env.PORT||3000,()=>{
    console.log(`listeinig at port http://localhost:3000`)
})


// 4a9e0299af97d44216af7682106cd262-us18  // api key
// 41282b4bf0 unique id for audience prkskrs

//  --data @- \
// <<EOF | jq '.id'
// {
//   "name": "$event_name",
//   "contact": $footer_contact_info,
//   "permission_reminder": "permission_reminder",
//   "email_type_option": true,
//   "campaign_defaults": $campaign_defaults
// }
// EOF