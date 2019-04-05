const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.get('/',(req, res)=>{
    const apiUrl = 'http://xkcd.com/info.0.json';

    fetch(apiUrl)
        .then(apires => apires.json())
        .then(data => {
            res.json(data);
        });
});

const port = process.env.PORT || 8080;

app.listen(port,()=> console.log(`Server running on port ${port}`));