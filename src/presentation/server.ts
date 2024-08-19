import express from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path
    }

    async start (){
        
        //* Middlewares

        //* Public Folder
        this.app.use( express.static(this.publicPath) );

        this.app.get('*',(req, res )=> {

            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);// con esto se arregla el problema de que no se encuentra el archivo index.html en la app
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, ()=>{
            console.log(`Server is running on port ${this.port}`);
        });
    }
}