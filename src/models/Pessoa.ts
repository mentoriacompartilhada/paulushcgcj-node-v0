export class Pessoa{
    id: number;
    nome: string;
    email: string;
    password: string;

    constructor(id: number,nome: string,email: string, password: string){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.password = password;
    }
}