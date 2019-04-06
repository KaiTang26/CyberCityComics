const fetch = require('node-fetch');

module.exports = function ApiHandler(url, res, Count){
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