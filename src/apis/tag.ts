import instance from './config';

const getAllRootTags = () => {
    return instance({
        method: "GET",
        url: `/tag/list/root`,
    })
};

const getTags = (id: number) => {
    return instance({
        method: "GET",
        url: `/tag/list/${id}`,
    })
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