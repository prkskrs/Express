//jshint esversion:
const dotenv=require("dotenv")
const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const mongoose=require("mongoose")
dotenv.config();
const app=express()
app.set('view engine','ejs')

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')



// npm i passport passport-local passport-local-mongoose express-session
const session=require("express-session")
const passport=require("passport")
const passportLocalMongoose=require("passport-local-mongoose")
const { use } = require("passport")

app.use(session({
    secret:"our lttle secret",
    resave:false,
    saveUninitialized:false 
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true})
// mongoose.set("useCreateIndex",true)
const userSchema=new mongoose.Schema({
    email:String,
    password:String
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const User=mongoose.model("User",userSchema);

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  // npm install mongoose-findorcreate
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log(profile)
      return cb(err, user);
    });
  }
));


app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/auth/google",
    passport.authenticate('google', { scope: ["profile"] })
)

app.get('/auth/google/secrets', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/secrets');
  });


app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register")
})




app.get("/secrets",function(req,res){
    if(req.isAuthenticated()){
        res.render("secrets")
    }
    else{
        res.render("login")
    }
})


app.post("/register",(req,res)=>{
    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log(err)
            res.render("register")
        }
        else{
            console.log(user)
            passport.authenticate("local")(req,res,function(){
                res.render("secrets");
            })
        }
    })
})


app.post("/login",(req,res)=>{
    const user=new User({
        username:req.body.username,
        password:req.body.password,
    })

    req.login(user,function(err){
        if(err){
            console.log(err)
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.render("secrets");
            })
        }
    })
})


app.get("/logout",function(req,res) {
    req.logout();
    res.redirect("/")
})



app.listen(3000,()=>{
    console.log(`listening at port http://localhost:3000`)
})