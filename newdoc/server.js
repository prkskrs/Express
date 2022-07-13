const express=require("express")
const bodyParser=require("body-parser")

const app=express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/Calc.html")
})

app.post("/",(req,res)=>{
    console.log(req.body)
    var n1=Number(req.body.num1);
    var n2=Number(req.body.num2);
    var result=n1+n2;
    res.send("Result : "+result)
})


app.listen(3000,()=>{
    console.log(`port at http://localhost:3000`)
})