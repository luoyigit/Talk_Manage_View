import request from './service'

const addCategory = function(categoryFormData) {
    return request({
        url: '/itemCategory/add',
        data: categoryFormData,
        method: 'post'
    });
}

const updateCategory = function(categoryFormData) {
    return request({
        url: '/itemCategory/Edit',
        data: categoryFormData,
        method: 'post'
    });
}

const removeCategory = function(id) {
    return request({
        url: '/itemCategory/remove',
        data: { id: id},
    });
}

const getCategoryList = function(option) {
    return request({
        url: '/itemCategory/GetItemCategoryList',
        data: option,
    });
}
const getCategoryTreeData = function() {
    return request({
        url: '/itemCategory/GetItemCategoryTreeData',
    });
}

const clearCategories = function() {
    return request({
        url: '/itemCategory/clear',
        method: 'post'
    });
}

export default {
    addCategory,
    updateCategory,
    removeCategory,
    getCategoryList,
    getCategoryTreeData,
    clearCategories
}