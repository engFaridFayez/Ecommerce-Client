import axios from "axios";
import api from "./axios";

export const getProducts = (url) =>{
    if(url){
        return axios.get(url)
    }
    return api.get("store/products/")
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