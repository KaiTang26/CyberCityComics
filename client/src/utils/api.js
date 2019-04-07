import axios from 'axios';

export default{

    fetchHome: function(){
        return axios.get('http://localhost:8080/api')
                    .then(res => {
                        return res.data
                    })
    },
    fetchPage: function(num){
        return axios.get(`http://localhost:8080/api/${num}`)
                    .then(res => {
                        return res.data
                    })
    }
}