const express = require('express');

const app = express();
const port = 8888;
let pessoasMap = [];

app.use(express.json());


app.get('/api/hello', (req, res) => {
    res.send("Hello World");
});


app.get('/api/pessoas',(req,res) =>{
    let page = req.query.page || 0;
    let size = req.query.size || 10;
    page = parseInt(page);
    size = parseInt(size);

    let pessoasList = pessoasMap.slice(page * size,(page * size) + size);
    res.setHeader('Content-Type', 'application/json');
    res.send({page:page,size:pessoasList.length,total:pessoasMap.length,items: pessoasList});
});

app.post('/api/pessoas',(req,res)=>{    
    let pessoa = req.body;
    pessoa.id = pessoasMap.length + 1;
    pessoasMap.push(pessoa);
    res.setHeader('Location', `/api/pessoas/${pessoa.id}`);
    res.statusCode = 201;
    res.send();
});

app.get('/api/pessoas/:id',(req,res)=>{    
    let pessoa = pessoasMap.find(pessoa => pessoa.id === parseInt(req.params.id));
    if(pessoa)
        res.send(pessoa);
    else{
        res.statusCode = 404;
        res.send();
    }
});

app.put('/api/pessoas/:id',(req,res)=>{    
    let pessoaNova = req.body;
    pessoaNova.id = parseInt(req.params.id); 

    let pessoa = pessoasMap.find(pessoa => pessoa.id === pessoaNova.id);
    let outrasPessoas = pessoasMap.filter(pessoa => pessoa.id !== pessoaNova.id);
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
    let pessoa = pessoasMap.find(pessoa => pessoa.id === parseInt(req.params.id));
    if(pessoa){
        pessoasMap = pessoasMap.filter(p => p.id !== parseInt(req.params.id));        
        res.statusCode = 204;
        res.send();
    } else {
        res.statusCode = 404;
        res.send();
    }
});

const httpServer = require('http').createServer(app);
httpServer.listen(port);
exports.default = httpServer;