import instance from './config';

/**
 * 获取用户列表
 * @param currentPage 当前页数
 * @param pageSize 每页条数
 * @returns promise
 */
const getUsers = (currentPage: string, pageSize: string) => {
    return instance({
        method: 'GET',
        url: `/admin/users/${currentPage}/${pageSize}`
    })
};

/**
 * 添加管理员
 * @param id 用户id
 * @returns 
 */
const addUser = (id: string) => {
    return instance({
        method: 'PATCH',
        url: `/admin/user/${id}`
    })
}

/**
 * 删除用户
 * @param id 用户id
 * @returns 
 */
const deleteUser = (id: string) => {
    return instance({
        method: 'DELETE',
        url: `/admin/user/${id}`
    })
}

/**
 * 获取用户信息
 * @returns 
 */
const getUserInfo = () => {
    return instance({
        method: 'GET',
        url: '/user/info'
    })
}

/**
 * 更新用户昵称
 * @param name 昵称
 * @returns 
 */
const updateNick = (name: string) => {
    return instance({
        method: 'PATCH',
        url: `/user/nickname/${name}`
    })
}

/**
 * 更新密码
 * @param password 新密码
 * @returns 
 */
const updatePassword = (password: string) => {
    return instance({
        method: 'PATCH',
        url: `/user/password/?password=${password}`
    })
}

/**
 * 更新用户头像
 * @param data {url:string}
 * @returns 
 */
const updateAvatar = (data: object) => {
    return instance({
        method: 'PATCH',
        url: '/user/avatar',
        data
    })
}

/**
 * 获取肤质评测结果
 * @param data 答案数组[{id:0,label:'A'}]
 * @returns 
 */
const score = (data: object) => {
    return instance({
        method: 'POST',
        url: '/user/score',
        data
    })
}
export { getUsers, addUser, deleteUser, getUserInfo, updateNick, updatePassword, updateAvatar, score };


