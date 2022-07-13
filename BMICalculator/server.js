const express=require("express");
const bodyParser=require("body-parser");
app=express();

app.use(bodyParser.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/client/BMICalculator.html")
})

app.post("/",(req,res)=>{

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


app.listen(3000,()=>{
    console.log(`Listening at Port : http://localhost:3000`);
})