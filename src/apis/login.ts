import instance from './config';

/**
 * 登录
 * @param data 登录表单数据
 * @returns 
 */
const login = (data: object) => {
    return instance({
        method: 'POST',
        url: '/user/login',
        data: data
    })
};

/**
 * 获取图片验证码
 * @param key 随机字符串
 * @returns 
 */
const getImageCode = (key: string) => {
    return instance({
        method: "GET",
        url: `/user/codes/image/${key}`,
        responseType: 'blob'
    })
}

/**
 * 获取邮箱验证码
 * @param key 随机字符串，和图片二维码的key保持一致
 * @param code 图片验证码
 * @param username 邮箱
 * @returns 
 */
const sentCode = (key: string, code: string, username: string) => {
    const queryParams = `?key=${key}&code=${code}&username=${username}`;
    return instance({
        method: 'GET',
        url: `/user/codes/email${queryParams}`,
    });
};

/**
 * 注册
 * @param data 注册表单数据
 * @returns 
 */
const register = (data: object) => {
    return instance({
        method: 'POST',
        url: '/user/register',
        data: data
    })
}


export { login, getImageCode, sentCode, register };

