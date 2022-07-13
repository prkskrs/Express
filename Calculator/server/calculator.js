const express=require("express")
const bodyParser=require("body-parser")
const app=express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    // res.send("<h1>Home</h1>")
   // console.log(__dirname+"/client")
   res.sendFile(__dirname+"/client"+"/index.html")
})


app.post("/",(req,res,next)=>{
    console.log(req.body)
    var num1=Number(req.body.num1);
    var num2=Number(req.body.num2);
    var opr=req.body.opr;
    var result;
    if(opr==="+"){
        result=num1+num2;
    }
    else if(opr==="-"){
        result=num1-num2;
    }
    else if(opr==="*"){
        result=num1*num2;
    }
    else if(opr==="/"){
        result=num1/num2;
    }
    res.send("Result : "+result);
    res.send("THanks");
    next();
})


app.listen(3000,function(){
    console.log(`Listening at port http://localhost:3000`)
})