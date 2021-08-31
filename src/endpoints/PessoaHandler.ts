import { CommonRoutesConfig } from "./common.routes.config";
import { Pessoa } from "../models/Pessoa";
import express from 'express';

export class PessoaHandler extends CommonRoutesConfig {
    pessoasMap: Pessoa[]
    constructor(app: express.Application) {
        super(app, 'Pessoahandler');
        this.pessoasMap = [];
    }

    getPessoas(page: number, size: number) {
        return this.pessoasMap.slice(page * size, (page * size) + size);
    }

    addPessoa(nome: string, email: string, password: string) {
        const pessoa = new Pessoa(this.pessoasMap.length + 1, nome, email, password);
        this.pessoasMap.push(pessoa);
        return pessoa;
    }

    getPessoa(id: number) {
        return this.pessoasMap.find(p => p.id === id);
    }

    configureRoutes() {

        this.app.route('/api/pessoas')

            .get((req: express.Request, res: express.Response) => {
                const { page = "0", size = "10" } = req.query;
                const pessoasList = this.getPessoas(parseInt(page as string, 10), parseInt(size as string, 10));
                res
                    .header('Content-Type', 'application/json')
                    .send({
                        page: parseInt(page as string, 10),
                        size: pessoasList.length,
                        total: this.pessoasMap.length,
                        items: pessoasList
                    });
            })

            .post((req: express.Request, res: express.Response) => {
                const pessoa = this.addPessoa(req.body.nome, req.body.email, req.body.password);
                res.header('Location', `/api/pessoas/${pessoa.id}`).status(201).send();
            })

        this.app.route('/api/pessoas/:id')
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {

                const pessoa = this.getPessoa(parseInt(req.params.id, 10));
                if (pessoa)
                    next();
                else
                    res.status(404).send();

            })

            .get((req: express.Request, res: express.Response) => {
                res.send(this.getPessoa(parseInt(req.params.id, 10)));
            })

            .put((req: express.Request, res: express.Response) => {
                const pessoaNova = new Pessoa(parseInt(req.params.id, 10), req.body.nome, req.body.email, req.body.password);

                const pessoa = this.getPessoa(pessoaNova.id);
                const outrasPessoas = this.pessoasMap.filter(p => p.id !== pessoaNova.id);
                outrasPessoas.push(pessoaNova);


                if (pessoa) {
                    this.pessoasMap = outrasPessoas;
                    res.status(202).send();
                } else
                    res.status(404).send();
            })

            .delete((req: express.Request, res: express.Response) => {
                this.pessoasMap = this.pessoasMap.filter(p => p.id !== parseInt(req.params.id, 10));
                res.status(204).send();
            });

        return this.app;
    }
}