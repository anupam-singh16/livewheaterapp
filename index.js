const http = require("http");
const fs= require("fs");
// import * as fs from 'fs';
var  requests=require("requests");

const homePage=fs.readFileSync("home.html","utf-8");

 const replaceVal=(tempVal,orgVal)=>{
   let temprature=tempVal.replace("{%tempval%}",orgVal.main.temp);
       temprature=temprature.replace("{%tempmin%}",orgVal.main.temp_min);
       temprature=temprature.replace("{%tempmax%}",orgVal.main.temp_max);
       temprature=temprature.replace("{%locatio%}",orgVal.name);
       temprature=temprature.replace("{%country%}",orgVal.sys.country);
       temprature=temprature.replace("{%tempStatus%}",orgVal.weather[0].main);
       
         return temprature;
 }
const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=noida&appid=253797e14e51b7bdef48e131b6b0691d")
       .on('data', (chunk)=> {
           console.log(chunk)
           const objData=JSON.parse(chunk);
           const arrData=[objData];

           const realData =arrData.map((val)=>replaceVal(homePage,val))
           .join("");
          res.write(realData);
          //  res.write(realData);
     })
        .on('end',  (err)=>{
    if (err) return console.log('connection closed due to errors', err);
           res.end();
     });
  }
});

 server.listen(8000,"127.0.0.1",()=>{
   console.log("port is running")
 });