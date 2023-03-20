import instance from './config';

const getAllRootTags = (isShowMsg: boolean) => {
    return instance({
        method: "GET",
        url: `/tag/list/root`,
    }, isShowMsg)
};

const getTags = (id: number, isShowMsg: boolean) => {
    return instance({
        method: "GET",
        url: `/tag/list/${id}`,
    }, isShowMsg)
}
const addTag = (data: object) => {
    return instance({
        method: 'POST',
        url: `/admin/add`,
        data
    })
}

const deleteTag = (id: string) => {
    return instance({
        method: 'DELETE',
        url: `/admin/delete/${id}`
    })
}

const deleteArray = (tagIdList: number[]) => {
    return instance({
        method: 'DELETE',
        url: '/admin/batch/delete',
        data: {
            tagIdList: tagIdList
        }
    })

}

const preference = (data: object) => {
    return instance({
        method: 'POST',
        url: '/user/preference',
        data
    })
}

export { getAllRootTags, getTags, addTag, deleteTag, deleteArray, preference };