import instance from './config';

/**
 * 获取所有根标签
 * @param isShowMsg 是否显示成功消息
 * @returns 
 */
const getAllRootTags = (isShowMsg: boolean) => {
    return instance({
        method: "GET",
        url: `/tag/list/root`,
    }, isShowMsg)
};

/**
 * 根据根标签id获取其叶子标签
 * @param id 标签id
 * @param isShowMsg 是否显示成功消息
 * @returns 
 */
const getTags = (id: number, isShowMsg: boolean) => {
    return instance({
        method: "GET",
        url: `/tag/list/${id}`,
    }, isShowMsg)
}

/**
 * 添加新标签
 * @param data 标签数据对象
 * @returns 
 */
const addTag = (data: object) => {
    return instance({
        method: 'POST',
        url: `/admin/add`,
        data
    })
}


/**
 * 删除标签
 * @param id 标签id
 * @returns 
 */
const deleteTag = (id: string) => {
    return instance({
        method: 'DELETE',
        url: `/admin/delete/${id}`
    })
}

/**
 * 一键删除标签
 * @param tagIdList 标签数组 eg:[1,2]
 * @returns 
 */
const deleteArray = (tagIdList: number[]) => {
    return instance({
        method: 'DELETE',
        url: '/admin/batch/delete',
        data: {
            tagIdList: tagIdList
        }
    })

}

/**
 * 获取用户偏好
 * @param data 分页对象
 * @returns 
 */
const preference = (data: object) => {
    return instance({
        method: 'POST',
        url: '/user/preference',
        data
    })
}

export { getAllRootTags, getTags, addTag, deleteTag, deleteArray, preference };