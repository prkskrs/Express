//jshint esversion:
const dotenv=require("dotenv")
const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const mongoose=require("mongoose")

// npm i mongoose-encryption
// const encrypt=require("mongoose-encryption")

// npm i md5 (Hashing)
// const md5=require("md5")

// npm i bcrypt
const bcrypt=require("bcrypt")
const saltRounds=10;

dotenv.config();


mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true})
const userSchema=new mongoose.Schema({
    email:String,
    password:String
})

// Encryption

// const secret="mysecretmylife";
// userSchema.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:['password']})

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


// Hashing (md5) for "register"
// app.post("/register",(req,res)=>{
//     console.log(req.body);
//     const newUser = new User({
//         email:req.body.username,   
//         password:md5(req.body.password),   
//     })
//     newUser.save(function(err){
//         if(err){
//             console.log(err)
//         }
//         else{
//             res.render("secrets")
//         }
//     });
// })


// bcrypt.hash salting rounds for "register"
app.post("/register",(req,res)=>{
    console.log(req.body);
    bcrypt.hash(req.body.password,saltRounds,function(err,hash) {
        // console.log(hash)
        const newUser = new User({
            email:req.body.username,        
            password:hash
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
   
})

// Hashing (md5) for "login"
// app.post("/login",(req,res)=>{
//     const loginEmail=req.body.username;
//     const loginPassword=md5(req.body.password);   // Hashing (md5)
//     User.findOne({email:loginEmail},function(err,foundUser){
//         if(err){
//             console.log(err)
//         }
//         else{
             
//             if(foundUser.password===loginPassword){
//                 console.log(foundUser);
//                 res.render("secrets");
//             }
//             else{
//                 res.send("You've entered a wrong password!!")
//             }
            
//         }
//     })
// })


// bcrypt.hash salting rounds for "login"
app.post("/login",(req,res)=>{
    const loginEmail=req.body.username;
    const loginPassword=req.body.password;   
    User.findOne({email:loginEmail},function(err,foundUser){
        if(err){
            console.log(err)
        }
        else{
             
            if(foundUser){
                console.log(foundUser);
                bcrypt.compare(loginPassword,foundUser.password,function(err,result){
                    if (result===true) {
                        res.render("secrets");
                    }
                    else{
                        res.send("You've entered a wrong password!!")
                    }
                })
            }
            
            
        }
    })
})





app.listen(3000,()=>{
    console.log(`listening at port http://localhost:3000`)
})