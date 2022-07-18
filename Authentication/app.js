//jshint esversion:
const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const mongoose=require("mongoose")
const encrypt=require("mongoose-encryption")
const dotenv=require("dotenv")

dotenv.config();


mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true})
const userSchema=new mongoose.Schema({
    email:String,
    password:String
})

const secret="mysecretmylife";
userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:['password']})

const User=mongoose.model("User",userSchema);


const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",(req,res)=>{
    console.log(req.body);
    const newUser = new User({
        email:req.body.username,   
        password:req.body.password,   
    })
    newUser.save(function(err){
        if(err){
            console.log(err)
        }
        else{
            res.render("secrets")
        }
    });
})

app.post("/login",(req,res)=>{
    const loginEmail=req.body.username;
    const loginPassword=req.body.password;
    User.findOne({email:loginEmail},function(err,foundUser){
        if(err){
            console.log(err)
        }
        else{
             
            if(foundUser.password===loginPassword){
                console.log(foundUser);
                res.render("secrets");
            }
            else{
                res.send("You've entered a wrong password!!")
            }
            
        }
    })
})




app.listen(3000,()=>{
    console.log(`listening at port http://localhost:3000`)
})