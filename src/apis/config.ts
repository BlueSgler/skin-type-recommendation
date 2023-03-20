import axios from 'axios'
import { AxiosRequestConfig } from 'axios'
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

type Response = {
    result: any,
    message: string,
    succeed: boolean
}

// instance.interceptors.response.use(
//     (res) => {
//         // 对响应数据做些什么
//         console.log(res, '====>resp');
//         return Promise.resolve(res as Res)
//         // const res = response.data
//         // console.log(res, '---->res');


//         // if (typeof res.data === 'object' && res.data !== null) {
//         //     if (res.succeed) {
//         //         return response;
//         //     }
//         //     throw new Error(res.message)
//         // }

//         // if (res.data) {
//         //     return response
//         // }

//         // if (res instanceof Blob) {
//         //     return response
//         // }
//         // if (res.succeed) {
//         //     return response
//         // }

//         // throw new Error(res.message)
//     },
//     error => {
//         // 对响应错误做些什么
//         ElMessage.error(error.message || '未知错误')
//         return Promise.reject(error)
//     }
// )

const http = async (config: AxiosRequestConfig, isShowMsg = true, successMsg?: string): Promise<Response> => {
    try {
        const axiosRes = await instance(config)
        const res: Response = axiosRes.data
        if (res instanceof Blob) {
            return res
        }
        if (res) {
            if (res.succeed) {
                if (isShowMsg) {
                    ElMessage.success(successMsg ? successMsg : res.message || '成功')
                }
                return res
            }
            throw new Error(res.message)
        }
        throw new Error('unknown err')
    } catch (err) {
        if (err instanceof Error) {
            ElMessage.error(err.message || '未知错误')
        }
        throw err
    }
}
export default http
