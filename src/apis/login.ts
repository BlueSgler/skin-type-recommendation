// src/api/user.ts
import instance from './config';

const login = (data: object) => {
    return instance({
        method: 'POST',
        url: '/user/login',
        data: data
    })
};
const getImageCode = (key: string) => {
    return instance({
        method: "GET",
        url: `/user/codes/image/${key}`,
        responseType: 'blob'
    })
}

const sentCode = (key: string, code: string, username: string, successMsg: string) => {
    const queryParams = `?key=${key}&code=${code}&username=${username}`;
    return instance({
        method: 'GET',
        url: `/user/codes/email${queryParams}`,
    }, successMsg);
};

const register = (data: object) => {
    return instance({
        method: 'POST',
        url: '/user/register',
        data: data
    })
}


export { login, getImageCode, sentCode, register };

// // src/api/article.ts
// import instance from '../utils/api'

// export function getArticleList() {
//     return instance.get('/article/list')
// }

// export function getArticle(id: number) {
//     return instance.get(`/article/${id}`)
// }

// export function createArticle(data: any) {
//     return instance.post('/article', data)
// }
