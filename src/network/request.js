import Axios from "axios";
export function request(config) {
    const instance = Axios.create({
        baseURL: 'http://api.vaith.xyz:8080',
        timeout: 60000,
    });
    instance.interceptors.request.use(config => {
        return config;
    }, error => {
        console.log(error);
    });

    instance.interceptors.response.use(res => {
        return res.data;
    }, error => {
        console.log(error);
    });

    return instance(config);
}
