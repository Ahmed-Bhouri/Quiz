const http = require("http");
const port = process.env.PORT || 5000;
const app = require("./app");

const server = http.createServer(app);


server.listen(port,function(){
    console.log("app running on port",port);
});