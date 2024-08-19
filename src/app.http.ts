import fs from 'fs';
import http from 'http';


const server = http.createServer((req, res)=>{

    console.log(req.url);


    // res.writeHead(200,{'Content-Type':'text/html'});
    // res.write(`<h1 style="color: red;">URL ${req.url}</h1>`); // this is server side rendering
    // res.end();

    // const data = { name: 'Jhon Dow', age: 30, city: 'New York' };
    // res.writeHead(200,{'Content-Type':'application/json'});
    // res.end(JSON.stringify(data));

    if(req.url === '/'){
        const htmlFIle = fs.readFileSync('./public/index.html','utf-8');
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(htmlFIle);
        return;
    }

    if( req.url?.endsWith('.js')){
        res.writeHead(200,{'Content-Type':'text/javascript'});

    }else if(req.url?.endsWith('.css')){
        res.writeHead(200,{'Content-Type':'text/css'});
    }

    const responseContent = fs.readFileSync(`./public/${req.url}`,'utf-8');
    res.end(responseContent);

});

server.listen(8080,()=>{
    console.log('Server is running on port 8080');
});

//HTTP1