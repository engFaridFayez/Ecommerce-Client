import api from "./axios";

export const getProducts = (page = 1) =>{
    return api.get(`store/products/?page=${page}`)
}

export const getProductDetails = (slug) =>{
    return api.get(`store/products/details/${slug}/`)
}

export const addProduct = (data) => {
    return api.post('store/products/',data, {
        headers: {'Content-Type': 'multipart/form-data'}
    })
}

export const updateProduct = (slug,data) => {
    return api.put(`store/products/update/${slug}/`,data,{
        headers: {'Content-Type': 'multipart/form-data'}
    })
}