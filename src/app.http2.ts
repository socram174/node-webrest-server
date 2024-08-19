import fs from 'fs';
import http2 from 'http2';


const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
},(req, res)=>{

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

    try {
        const responseContent = fs.readFileSync(`./public/${req.url}`,'utf-8');
        res.end(responseContent);
    }catch(err){
    res.writeHead(404,{'Content-Type':'text/html'});
    res.end();
    }

});

server.listen(8080,()=>{
    console.log('Server is running on port 8080');
});

//HTTP2