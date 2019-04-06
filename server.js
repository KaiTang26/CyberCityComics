const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const mongoose = require('mongoose');

const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
    .connect(db)
    .then(()=> console.log('MonogoDB Connected'))
    .catch(err=> console.log(err));

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const Count = require('./models/Count');

app.get('/',(req, res)=>{
    const apiUrl = 'http://xkcd.com/info.0.json';
    ApiHandler(apiUrl, res, Count)  
});

app.get('/:num',(req, res)=>{

    const num = req.params.num;
    console.log(num);
    const apiUrl = `https://xkcd.com/${num}/info.0.json`;

    ApiHandler(apiUrl, res, Count)
    
});

function ApiHandler(url, res, Count){
    fetch(url)
        .then(apires => apires.json())
        .then(data => {
            Count.findOne({num:data.num})
                .then(count =>{
                    if(count){
                        count.count = count.count+1;
                        count.save()
                             .then(count=>{
                                res.json({
                                    'num': data.num,
                                    'title': data.title,
                                    'year': data.year,
                                    'month':data.month,
                                    'day':data.day,
                                    'img':data.img,
                                    'count': count.count});
                            })
                            .catch(error => console.error(error));

                    } else{
                        const newCount = new Count({
                            num:data.num,
                            count: 1 });
                         newCount.save()
                        .then(count=>{
                            res.json({
                                'num': data.num,
                                'title': data.title,
                                'year': data.year,
                                'month':data.month,
                                'day':data.day,
                                'img':data.img,
                                'count': count.count});
                            })
                        .catch(error => console.error(error));

                    }});
            })
        .catch(error => console.error(error));
}

const port = process.env.PORT || 8080;

app.listen(port,()=> console.log(`Server running on port ${port}`));