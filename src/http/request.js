//这是网络请求进行的稍微封装， 使代码风格保持一致


import Toast from "../utils/Toast";
export default async (url, config) => {

    //拼接url
    url = `http://gank.io/api/${url}`;

    //获取传递的参数以及请求方式 'GET' 'POST' 默认是'GET'
    let {method, data} = config;
    let requestConfig = {};
    if (!data) {
        data = {};
    }

    requestConfig.method = method || 'GET';

    //根据传递参数 进行url拼接 url?xxx=xxx&
    const searchParams = Object.keys(data)
        .map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        })
        .join('&');

    if (method === 'POST') {
        requestConfig.headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        };
        requestConfig.body = searchParams;
        console.log('POST请求url = ' + url + '-请求参数 = ' + requestConfig.body);
    }

    if (requestConfig.method === 'GET') {
        url = `${url}?${searchParams}`;

        console.log('GET请求url = ' + url);
    }

    //请求 返回数据
    return fetch(url, requestConfig)
        .then(response => response.json())
        .then(res => {
            if (!res.error) {
                console.log('获取数据', res.results)
                return res;
            }
        }).catch(err => {
            console.log('请求失败' + err);
            Toast('网络异常');
        })
};

