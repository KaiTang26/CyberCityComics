import axios from 'axios';

export default{

    fetchHome: function(){
        return axios.get('https://secret-gorge-18477.herokuapp.com/api')
                    .then(res => {
                        return res.data
                    })
    },
    fetchPage: function(num){
        return axios.get(`https://secret-gorge-18477.herokuapp.com/api/${num}`)
                    .then(res => {
                        return res.data
                    })
    }
}