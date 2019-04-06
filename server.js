const express = require('express');
//const bodyParser = require('body-parser');
//const fetch = require('node-fetch');
const mongoose = require('mongoose');

const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(()=> console.log('MonogoDB Connected'))
    .catch(err=> console.log(err));


const Count = require('./models/Count');

const ApiHandler = require('./handler/ApiHandler');

const validator = require('./validation/validator');



app.get('/',(req, res)=>{
    const apiUrl = 'http://xkcd.com/info.0.json';
    ApiHandler(apiUrl, res, Count)  
});



app.get('/:num',(req, res)=>{
    const num = req.params.num;
    if(validator(parseInt(num))){
        const apiUrl = `https://xkcd.com/${num}/info.0.json`;
        ApiHandler(apiUrl, res, Count)
    }else{
        res.json({
            'error':'input param wrong'
            });
    } 
});


const port = process.env.PORT || 8080;

app.listen(port,()=> console.log(`Server running on port ${port}`));