import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'

const instance = axios.create({
    baseURL: __APP_ENV__.VITE_API_BASE_URL,
    timeout: 10000
})

instance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token')
        if (token) {

            config.headers['Authorization'] = 'Bearer ' + token
            // window.sessionStorage.getItem('token')
        }
        console.log(config);

        return config
    },
    error => {


        router.push('/login')
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        // 对响应数据做些什么
        console.log(response, '====>resp');

        const res = response.data
        console.log(res, '---->res');


        if (typeof res.data === 'object' && res.data !== null) {
            if (res.succeed) {
                return response;
            }
            throw new Error(res.message)
        }

        if (res.data) {
            return response
        }

        if (res instanceof Blob) {
            return response
        }
        if (res.succeed) {
            return response
        }

        throw new Error(res.message)
    },
    error => {
        // 对响应错误做些什么
        ElMessage.error(error.message || '未知错误')
        return Promise.reject(error)
    }
)


export default instance
