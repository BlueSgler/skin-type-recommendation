import instance from './config';

const getAllRootTags = () => {
    return instance({
        method: "GET",
        url: `/tag/list/root`,
    })
};

export { getAllRootTags };