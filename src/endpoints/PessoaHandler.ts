import { CommonRoutesConfig } from "./common.routes.config";
import { Pessoa } from "../models/Pessoa";
import { PessoaService } from "../services/PessoaService";
import express from 'express';

export class PessoaHandler extends CommonRoutesConfig {
    service: PessoaService;
    constructor(app: express.Application) {
        super(app, 'Pessoahandler');
        this.service = new PessoaService();
    }

    configureRoutes() {

        this.app.route('/api/pessoas')
            .get((req: express.Request, res: express.Response) => {
                const { page = "0", size = "10" } = req.query;
                res
                    .header('Content-Type', 'application/json')
                    .send(this.service.listPessoas(parseInt(page as string, 10), parseInt(size as string, 10)));
            })
            .post((req: express.Request, res: express.Response) => {
                const pessoa = this.service.addPessoa(req.body.nome, req.body.email, req.body.password);
                res.header('Location', `/api/pessoas/${pessoa.id}`).status(201).send();
            });

        this.app.route('/api/pessoas/:id')
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                if (this.service.hasPessoa(parseInt(req.params.id, 10)))
                    next();
                else
                    res.status(404).send();
            })
            .get((req: express.Request, res: express.Response) => {
                const thePessoa = this.service.getPessoa(parseInt(req.params.id, 10));
                res.send(thePessoa);
            })
            .put((req: express.Request, res: express.Response) => {
                this.service.updatePessoa(new Pessoa(parseInt(req.params.id, 10), req.body.nome, req.body.email, req.body.password));
                res.status(202).send();
            })
            .delete((req: express.Request, res: express.Response) => {
                this.service.removePessoa(parseInt(req.params.id, 10));
                res.status(204).send();
            });

        return this.app;
    }
}