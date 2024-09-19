import express, { Router } from 'express';
import compression from 'compression';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path
        this.routes = routes;
    }

    async start (){
        
        //* Middlewares
        this.app.use( express.json()); // para que express pueda entender json raw
        this.app.use( express.urlencoded({ extended: true }) ); // para que express pueda entender formularios x-www-form-urlencoded
        this.app.use( compression() );

        //* Public Folder
        this.app.use( express.static(this.publicPath) );

        //* Routes
        this.app.use(this.routes);

        //* SPA
        this.app.get('*',(req, res )=> {

            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);// con esto se arregla el problema de que no se encuentra el archivo index.html en la app
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, ()=>{
            console.log(`Server is running on port ${this.port}`);
        });
    }
}