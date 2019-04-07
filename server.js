const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(()=> console.log('MonogoDB Connected'))
    .catch(err=> console.log(err));

// Load Count data model
const Count = require('./models/Count');
//Load api help method
const ApiHandler = require('./handler/ApiHandler');
// Load valiation help method
const validator = require('./validation/validator');

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();

})

//@route Get /api
//@desc Homepage displays the latest comic
//@access Public

app.get('/api',(req, res)=>{
    const apiUrl = 'http://xkcd.com/info.0.json';
    ApiHandler(apiUrl, res, Count)  
});

//@route Get /api/:num
//@desc fetch specific page
//@access Public
app.get('/api/:num',(req, res)=>{
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

//server static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*',(req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}


const port = process.env.PORT || 8080;

app.listen(port,()=> console.log(`Server running on port ${port}`));