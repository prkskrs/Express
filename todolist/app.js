const bodyParser = require("body-parser")
const http = require("https")
const express=require("express")
const ejs=require("ejs")
const { response } = require("express")

var items=["Buy Food","Cook Food","Eat Food"];
let workitems=[]

const app=express()


// import date.js
const date=require("./date");
// console.log(date)
// console.log(date())

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.set('view engine','ejs')

app.get("/",(req,res)=>{
    // var today=new Date();
    // console.log(today)
    // var day=""
    // var currentDay=today.getDay();
    // if (currentDay===6||currentDay===0) {
    //     day="weekend"
    // }
    // else{
    //     day="weekday"
        
    // }
    // day="weekend"
    // res.render("lists",{kindOfDay:day});

    // switch (currentDay) {
    //     case 0: day="Sunday"; break;
    //     case 1: day="Monday"; break;
    //     case 2: day="Tuesday"; break;
    //     case 3: day="Wednesday"; break;
    //     case 4: day="Thursday"; break;
    //     case 5: day="Friday"; break;
    //     case 6: day="Saturday"; break;
    //     default:
    //         day="404!";
    //         break;
    // }
    // res.render("lists",{kindOfDay:day});

  // javscript method

    let day=date.getWeekDay();
    // let day=date.getDate();
    res.render("lists",{listTitle:day,newListItems:items});
})


app.post("/",(req,res)=>{
    console.log(req.body.addItem)
    console.log(req.body)
    var item=req.body.addItem;
    if (req.body.list==="WorkList") {
        workitems.push(item);
        res.redirect("/work")
    }
    else{
        items.push(item);
        res.redirect("/")
    }
})


app.get("/work",(req,res)=>{
    res.render("lists",{listTitle:"WorkList",newListItems:workitems});
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