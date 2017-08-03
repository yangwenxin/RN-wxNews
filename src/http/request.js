//这是网络请求进行的稍微封装， 使代码风格保持一致


export default async (url, config) => {

    let token = global.token;

    //拼接url
    url = `http://${env[global.defaultUrl]}/${url}`;

    //获取传递的参数以及请求方式 'GET' 'POST' 默认是'GET'
    let {method, data} = config;
    let requestConfig = {};
    if (!data) {
        data = {};
    }
    //添加请求token
    data.token = token;

    console.log('请求token  = ' + data.token);
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
            if (res.status !== 0) {

                if (res.status === 2) {
                    //token失效
                    Toast('服务器繁忙,请稍后重试!', {duration: 1000});
                    //刷新token
                    userToken();
                } else {
                    Toast(res.msg);
                }
                return;
            } else {
                console.log('获取数据',res.data)
                return res;
            }
        }).catch(err => {
            console.log('请求失败' + err);
            Toast('网络异常');
        })
};

