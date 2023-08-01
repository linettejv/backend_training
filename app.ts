import express from "express";
import { myCalculator } from "./calculator";
// to use the library

const server = express();

server.get('/',(req,res) => {
    console.log(req.url);
    res.status(200).send("Hey there this is express!! \n Implemented the calculator");

    let data:string = " string data input";
    console.log(data);
    let variable : string | number ;
    variable = "line";
    console.log(variable);
    variable = 90;
    console.log(variable);

})

// two parameters : what to do on req and 
// res => what to give back to server
// const server = http.createServer((req,res) => {
//     res.writeHead(200);
//     res.end("Hey! Hello there")
//     // front end at 3000 anything that comes to 3000 is handled here 

// } );

server.listen(3000 , () => {
    console.log("server listening to 3000")
} )

const calc = new myCalculator;
calc.add(45,90);
calc.sub(45,99);
calc.mul(67,89);
calc.div(90,45);
calc.percent(60);
calc.power(8,3);
