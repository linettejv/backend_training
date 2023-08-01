const http = require("http");
// to use the library

// two parameters : what to do on req and 
// res => what to give back to server
const server = http.createServer((req,res) => {
    res.writeHead(200);
    res.end("Hey! Hello there")
    // front end at 3000 anything that comes to 3000 is handled here 

} );

server.listen(3000 , () => {
    console.log("server listening to 3000")
} )