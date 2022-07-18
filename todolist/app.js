const bodyParser = require("body-parser")
const http = require("https")
const express=require("express")
const ejs=require("ejs")
const { response } = require("express")
const mongoose=require("mongoose")
const { Console } = require("console")
const _ =require("lodash")
 
// var items=["Buy Food","Cook Food","Eat Food"];
// let workitems=[]

// connect to db
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true},function(err) {
    if(err){
        console.log(err)
    }
    else{
        console.log("db connected....")
    }
})

// schema
const todoSchema=new mongoose.Schema({
    name:String
})

const Item=mongoose.model("Item",todoSchema);




const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.set('view engine','ejs')
const item1=new Item({
    name:"Buy Food"
})

const item2=new Item({
    name:"Cook Food"
})

const item3=new Item({
    name:"Eat Food"
})

const defaultItems=[item1,item2,item3];

app.get("/",(req,res)=>{
Item.find({},function(err,founditems) {
        if (founditems.length===0) {
            
            Item.insertMany(defaultItems,function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("Successfully saved default items to DB....")
            }
            })
            res.redirect("/")
        }
        else{
            console.log(founditems)
            res.render("lists",{listTitle:"Today",newListItems:founditems});
        }
    })

    
})


app.post("/",(req,res)=>{
    //console.log(req.body.addItem)
   // console.log(req.body)
    var item=req.body.addItem;
    var listName=req.body.list;
    console.log(listName);
    var newItem= new Item({
        name:item
    })

    if(listName==="Today"){
        newItem.save();
        res.redirect("/")
    }
    else{
        List.findOne({title:listName},function(err,founditemlist){
               if(!err){
                console.log(founditemlist.title)
                founditemlist.items.push(newItem);
                founditemlist.save();
                res.redirect("/"+listName);
               }
            })
       
        
    }

 

})

app.post("/delete",(req,res)=>{
    console.log(req.body)
    let checkedItem=req.body.checkbox;
    let listName=req.body.listName;
    console.log(listName)
    if(listName==="Today"){
        Item.findByIdAndRemove({_id:checkedItem},function(err){
            if(err){
                console.log(err)
            }
            else{
                console.log("Successfully deleted....")
                res.redirect("/");

            }
        }) 
    }
    else{
        List.findOneAndUpdate({title:listName},{$pull:{items:{_id:checkedItem}}},function(err,foundlist){
            if(!err){
                console.log("Successfully deleted....")
                res.redirect("/"+listName);
            }
        })
    }
    
})


// customList

const listSchema=new mongoose.Schema({
    title:String,
    items:[todoSchema]
})

const List=mongoose.model("List",listSchema);

app.get("/:customListName",(req,res)=>{
    // console.log(req.params.customListName)
    const customListName=_.capitalize(req.params.customListName);
    List.findOne({title:customListName},function(err,foundList){
        if(!err){
            if(!foundList){
                const list=new List({
                    title:customListName,
                    items:defaultItems
                })
                list.save();
                res.redirect("/"+customListName);
            }
            else{
                res.render("lists",{listTitle:foundList.title,newListItems:foundList.items})
            }
        }
    })
})


// we don't need this post 

// app.post("/work",(req,res)=>{
//     let item =req.body.addItem;
//     workitems.push(item);
//     res.render("/work")
// })

app.get("/about",(req,res)=>{
    res.render("about")
})


app.listen(3000,()=>{
    console.log(`listening at port http://localhost:3000`)
})