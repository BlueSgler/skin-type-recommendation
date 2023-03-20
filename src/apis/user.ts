// src/api/user.ts
import instance from './config';

const getUsers = (currentPage: string, pageSize: string) => {
    return instance({
        method: 'GET',
        url: `/admin/users/${currentPage}/${pageSize}`
    })
};
const addUser = (id: string) => {
    return instance({
        method: 'PATCH',
        url: `/admin/user/${id}`
    })
}
const deleteUser = (id: string) => {
    return instance({
        method: 'DELETE',
        url: `/admin/user/${id}`
    })
}

const getUserInfo = () => {
    return instance({
        method: 'GET',
        url: '/user/info'
    })
}

const updateNick = (name:string) => {
    return instance({
        method: 'PATCH',
        url: `/user/nickname/${name}`
    })
}
const updatePassword = (password: string) => {
    return instance({
        method: 'PATCH',
        url: `/user/password/?password=${password}`
    })
}
export { getUsers, addUser, deleteUser, getUserInfo, updateNick, updatePassword };

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
