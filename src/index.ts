import express from 'express';
import httpSrv from 'http';

const app = express();
const port = 8888;

class Pessoa{
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


let pessoasMap : Pessoa[] = [];

app.use(express.json());

app.get('/api/hello', (req, res) => {
    res.send("Hello World");
});

app.get('/api/pessoas',(req,res) =>{
    const pageS = req.query.page as string || "0";
    const sizeS = req.query.size as string || "10";
    const page : number = parseInt(pageS,10);
    const size : number = parseInt(sizeS,10);

    const pessoasList = pessoasMap.slice(page * size,(page * size) + size);
    res.setHeader('Content-Type', 'application/json');
    res.send({page,size:pessoasList.length,total:pessoasMap.length,items: pessoasList});
});

app.post('/api/pessoas',(req,res)=>{
    const pessoa = new Pessoa(pessoasMap.length + 1,req.body.nome,req.body.email,req.body.password);
    pessoasMap.push();
    res.setHeader('Location', `/api/pessoas/${pessoa.id}`);
    res.statusCode = 201;
    res.send();
});

app.get('/api/pessoas/:id',(req,res)=>{
    const pessoa = pessoasMap.find(p => p.id === parseInt(req.params.id,10));
    if(pessoa)
        res.send(pessoa);
    else{
        res.statusCode = 404;
        res.send();
    }
});

app.put('/api/pessoas/:id',(req,res)=>{
    const pessoaNova = new Pessoa(parseInt(req.params.id,10),req.body.nome,req.body.email,req.body.password);
    
    const pessoa = pessoasMap.find(p => p.id === pessoaNova.id);
    const outrasPessoas = pessoasMap.filter(p => p.id !== pessoaNova.id);
    outrasPessoas.push(pessoaNova);


    if(pessoa){
        pessoasMap = outrasPessoas;
        res.statusCode = 202;
        res.send();
    } else {
        res.statusCode = 404;
        res.send();
    }

});

app.delete('/api/pessoas/:id',(req,res)=>{
    const pessoa = pessoasMap.find(p => p.id === parseInt(req.params.id,10));
    if(pessoa){
        pessoasMap = pessoasMap.filter(p => p.id !== parseInt(req.params.id,10));
        res.statusCode = 204;
        res.send();
    } else {
        res.statusCode = 404;
        res.send();
    }
});

const httpServer = httpSrv.createServer(app);
httpServer.listen(port);
export default httpServer;