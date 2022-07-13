const express =require("express")
const bodyParser =require("body-parser")
const app=express()
let titles=[]
let blogs=[]

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("Blogs",{newTitles:titles,newPosts:blogs})
})


app.get("/compose",(req,res)=>{
    console.log("We are in Compose")
    res.render("Compose")
})

app.post("/compose",(req,res)=>{
    var title=req.body.title;
    var post=req.body.post;
    console.log(title);
    console.log(post);
    titles.push(title);
    blogs.push(post);
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log(`listening at port http://localhost:3000`)
})