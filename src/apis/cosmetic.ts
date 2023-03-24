import instance from './config';

/**
 * 获取所有化妆品
 * @param data 分页数据
 * @param isShowMsg 是否显示成功信息
 * @returns 
 */
const getAllCometics = (data: object, isShowMsg: false) => {
    return instance({
        method: "POST",
        url: `/cosmetic/preference`,
        data
    }, isShowMsg)
};

/**
 * 获取化妆品详情
 * @param id 化妆品id
 * @returns 
 */
const getCometicsDeTail = (id: string) => {
    return instance({
        method: "GET",
        url: `/cosmetic/${id}`,
    })
}

/**
 * 
 * @param data 添加化妆品
 * @returns 
 */
const addCometic = (data: object) => {
    return instance({
        method: 'POST',
        url: `/admin/cosmetic`,
        data
    })
}

/**
 * 更新化妆品
 * @param data 化妆品信息
 * @returns 
 */
const updateCometic = (data: object) => {
    return instance({
        method: 'PATCH',
        url: `/admin/cosmetic`,
        data
    })
}

/**
 * 更加id删除化妆品
 * @param id 化妆品id
 * @returns 
 */
const deleteCometic = (id: string) => {
    return instance({
        method: 'DELETE',
        url: `/admin/cosmetic/${id}`
    })
}

/**
 * 一键删除化妆品
 * @param cosmeticIdList 化妆品id数组
 * @returns 
 */
const deleteArray = (cosmeticIdList: number[]) => {
    return instance({
        method: 'DELETE',
        url: '/admin/cosmetic/batch',
        data: {
            cosmeticIdList: cosmeticIdList
        }
    })

}

/**
 * 获取化妆品详情
 * @param id 化妆品id
 * @returns 
 */
const search = (data: object) => {
    return instance({
        method: 'POST',
        url: '/cosmetic/list',
        data
    })
}
export { getAllCometics, getCometicsDeTail, addCometic, updateCometic, deleteCometic, deleteArray, search };