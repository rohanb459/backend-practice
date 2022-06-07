// server creation
// 1. http module
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res)=>{
    console.log('request has been made from browser to server');
    // console.log(req.method);
    // console.log(req.url);

    res.setHeader('Content-Type', 'text/html');
    // res.write('<h1>Hello, Pepcoders! :)</h1>');
    // res.write('<h2>How you doin?</h2>');
    // res.end();

    let path = './views';
    switch(req.url){
        case '/':
            path+='/index.html';
            res.statusCode=200;
            break;

        case '/aboutus':
            path+='/aboutus.html';
            res.statusCode=200;
            break;

        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location', '/aboutus');
            res.end();
        default:
            path+='/404.html';
            res.statusCode=404;
            break;
    }

    fs.readFile(path, (err, fileData)=>{
        if(err)
        console.log(err);

        else{
            res.write(fileData);
            res.end();
        }
    })
});

// port number, host, callback func
server.listen(3000, 'localhost', ()=>{
    console.log('server is listed on port 3000');
})