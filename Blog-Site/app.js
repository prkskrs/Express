const express=require("express")
const bodyParser=require("body-parser")
const { default: mongoose } = require("mongoose")
const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")

// db connection
mongoose.connect("mongodb://localhost:27017/blogDb",{useNewUrlParser:true},function(err) {
    if(err){
        console.log(err)
    }
    else{
        console.log("db connected....")
    }
})

const postSchema=new mongoose.Schema({
    postContent:String
})

const Post=mongoose.model("Post",postSchema)

const post1=new Post({
    postContent:"This is post1"
})

const post2=new Post({
    postContent:"This is post2"
})

const post3=new Post({
    postContent:"This is post3"
})

const defaultPost=[post1,post2,post3]


app.get("/",(req,res)=>{
    Post.find({},function(err,foundposts) {
        if(foundposts.length===0){
            Post.insertMany(defaultPost,function(err){
                if(err){
                    console.log(err)
                }
                else{
                    console.log("successfull added default items in db")
                    
                }
                
            })
        }

        else{
            console.log(foundposts)
            res.render("posts",{postTitle:"Today",postItems:foundposts})
        }
    })
    
   
})

const postArray=[]
app.post("/",(req,res)=>{
    console.log(req.body)
    let title=req.body.postTitle;
    let content=req.body.postContent;
    if(title==="Today"){
        let newPost=new Post({
            postContent:content
        })
        newPost.save()
    }

    res.redirect("/")
})

app.post("/delete",(req,res)=>{
    let contentId=req.body.checkbox;
    console.log(contentId);
    Post.findByIdAndRemove({_id:contentId},function(err){
        if(err){
            console.log(err)
        }
        else{
            console.log("Successfully deleted....")
            res.redirect("/")
        }
    })
    
})




app.listen(3000,()=>{
    console.log(`listening at port http://localhost:3000`)
})