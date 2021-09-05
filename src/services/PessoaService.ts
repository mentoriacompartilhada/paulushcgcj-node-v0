import { Pessoa } from "../models/Pessoa";
import { Page } from "../models/Page";

export class PessoaService {

    pessoasMap: Pessoa[]
    constructor() {
        this.pessoasMap = [];
    }

    listPessoas(page: number, size: number): Page<Pessoa> {
        const pageContent = this.pessoasMap.slice(page * size, (page * size) + size);
        return new Page<Pessoa>(page, pageContent.length, this.pessoasMap.length, pageContent);
    }

    addPessoa(nome: string, email: string, password: string): Pessoa {
        const pessoa = new Pessoa(this.pessoasMap.length + 1, nome, email, password);
        this.pessoasMap.push(pessoa);
        return pessoa;
    }

    hasPessoa(id: number) : boolean {
        return this.getPessoa(id) !== undefined;
    }

    getPessoa(id: number): Pessoa | undefined {
        return this.pessoasMap.find(p => p.id === id);
    }

    updatePessoa(pessoa: Pessoa): void {
        this.pessoasMap.splice(pessoa.id - 1, 1, pessoa);
    }

    removePessoa(id: number): void {
        this.pessoasMap.splice(id - 1, 1);
    }

}