const bodyParser = require("body-parser")
const http = require("https")
const express=require("express")
const dotenv=require("dotenv")
const { response } = require("express")
const app=express()
app.use(bodyParser.urlencoded({extended:true}))

dotenv.config({path : "../.env"})

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/client/index.html")
})


app.post("/",(req,res)=>{
    console.log(req.body.place)
    const query=req.body.place;
    const appId=process.env.appId;
    const unit="metric";
    url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appId+"&units="+unit

    http.get(url,(response)=>{
        console.log(response.statusCode)
        response.on("data",(data)=>{
           // console.log(data)
            // const weatherData=JSON.stringify(data)
            // console.log(weatherData)
            const jsonData=JSON.parse(data)
            console.log(jsonData)
            const temperature=jsonData.main.temp;
            const description=jsonData.weather[0].description;
            const icon=jsonData.weather[0].icon
            const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(imageUrl)
            
            res.write("<h1>The temperature in "+query+" is "+temperature+" degree celcius.</h1>");
            res.write("<h2>The Weather is currently "+description+"</h2>");
            res.write("<img src="+imageUrl+">")
            res.send()

        })

    })

})

app.listen(3000,()=>{
    console.log(`listening at port http://localhost:3000`)
})