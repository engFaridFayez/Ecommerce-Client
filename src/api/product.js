import api from "./axios";

export const getProducts = () =>{
    return api.get("store/products/")
}

export const getProductDetails = (id) =>{
    return api.get(`store/products/${id}/`)
}