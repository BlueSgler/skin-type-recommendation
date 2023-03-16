// src/api/user.ts
import instance from './config';

const getUserInfo = () => {
    return instance.get('/user/info');
};

export { getUserInfo };

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
