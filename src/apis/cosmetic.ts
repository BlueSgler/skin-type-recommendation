import instance from './config';

const getAllCometics = (data: object, isShowMsg: false) => {
    return instance({
        method: "POST",
        url: `/cosmetic/preference`,
        data
    }, isShowMsg)
};

const getCometics = (data: object) => {
    return instance({
        method: "POST",
        url: `/cosmetic/list`,
        data
    })
}
const getCometicsDeTail = (id: string) => {
    return instance({
        method: "GET",
        url: `/cosmetic/${id}`,
    })
}
const addCometic = (data: object) => {
    return instance({
        method: 'POST',
        url: `/admin/cosmetic`,
        data
    })
}

const updateCometic = (data: object) => {
    return instance({
        method: 'PATCH',
        url: `/admin/cosmetic`,
        data
    })
}
const deleteCometic = (id: string) => {
    return instance({
        method: 'DELETE',
        url: `/admin/cosmetic/${id}`
    })
}

const deleteArray = (cosmeticIdList: number[]) => {
    return instance({
        method: 'DELETE',
        url: '/admin/cosmetic/batch',
        data: {
            cosmeticIdList: cosmeticIdList
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

export { getAllCometics, getCometics, getCometicsDeTail, addCometic, updateCometic, deleteCometic, deleteArray, preference };