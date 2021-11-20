const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res)
{
    const query=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=712ea229f244ea9aa0e9bacabd0508f6"
    https.get(url,function(response)
    {
        console.log(response.statusCode);
        response.on("data",function(data){
            const wetherdata=JSON.parse(data);
            const tmp=wetherdata.main.temp
            const wetherdescription=wetherdata.weather[0].description
            res.write("currnet wether -- "+wetherdescription);
            res.write("\n Temperature is -- "+tmp+"F");
            res.send();
        });
    });
});



app.listen(3000,function()
{
    console.log("server on 3000 port");
})