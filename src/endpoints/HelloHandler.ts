import { CommonRoutesConfig } from "./common.routes.config";
import express from 'express';

export class HelloHandler extends CommonRoutesConfig{
    constructor(app: express.Application){
        super(app,'HelloHandler');
    }

    configureRoutes(){

        this.app.route('/api/hello')
            .get((req: express.Request, res: express.Response) =>{
                res.send("Hello World");
            });

        return this.app;
    }
}