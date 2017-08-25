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
    return timeout(5000, fetch(url, requestConfig))
        .then(response => response.json())
        .then(res => {
            if (!res.error) {
                // console.log('获取数据', res.results);
                // console.log('获取数据', res.category);
                return res;
            }
        }).catch(err => {
            console.log('请求失败' + err);
        })
};

function timeout(ms, promise) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject(new Error("timeout"))
        }, ms);
        promise.then(resolve, reject);
    })
}

