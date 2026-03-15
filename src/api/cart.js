import api from "./axios";

export const viewCart = ()=>{
    return api.get("store/cart/view/")
}


export const addToCart = (data) =>{
    return api.post("store/cart/add/",data)
}
