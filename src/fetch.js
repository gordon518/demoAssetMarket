import axios from 'axios'
//import Qs from 'qs'
//Axios has 2 methods pass parameter，Form data and json: https://blog.csdn.net/u013253924/article/details/81772820
//Axios manual：http://axios-js.com/zh-cn/docs/index.html

let config = {
    baseURL: '/api',
    transformRequest: [
        function (data) {
            let ret = JSON.stringify(data)
            return ret
        }
    ],
    transformResponse: [
        function (data) {
            return data
        }
    ],
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    responseType: 'json'
};

axios.interceptors.response.use(function(res){
    //interceptor
    return res.data;
});


export function get(url) {
    return axios.get(url, config)
}

export function post(url, data) {
    return axios.post(url, data, config)
}
