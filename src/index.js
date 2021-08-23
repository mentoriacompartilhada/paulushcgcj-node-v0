const express = require('express');

const app = express();
const port = 3000;

app.get('/api/hello', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Ouvindo em ${port}`);
});