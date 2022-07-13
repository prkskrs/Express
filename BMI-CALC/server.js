const express=require("express")
const bodyParser=require("body-parser")
const app=express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    // res.send("<h1>Home</h1>")
   // console.log(__dirname+"/client")
   res.sendFile(__dirname+"/client"+"/Calculator.html")
})


app.post("/",(req,res)=>{
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
})

app.get("/BMICalculator",(req,res)=>{
    res.sendFile(__dirname+"/client/BMICalculator.html")
})

app.post("/BMICalculator",(req,res)=>{
    var wt=Number(req.body.wt);
    var ht=Number(req.body.ht);
    var bmi=wt/(ht*ht) ;
    console.log(req.body)
    if(bmi<18.5){
        res.send("BMI : "+bmi+"\nUNDERWEIGHT")
    }
    else if(bmi>=18.5 && bmi<=24.9){
        res.send("BMI : "+bmi+"\nNORMAL RANGE")
    }
    else if(bmi>=25&& bmi<=29.9){
        res.send("BMI : "+bmi+"\nOVERWEIGHT")
    }
    else{
        res.send("OBESE !!")
    }
    
})




app.listen(3000,function(){
    console.log(`Listening at port http://localhost:3000`)
})