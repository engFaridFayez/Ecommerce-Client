import api from "./axios";

export const viewCart = ()=>{
    return api.get("store/cart/view/")
}


export const addToCart = (data) =>{
    return api.post("store/cart/add/",data)
}

export const updateCart = (data) => {
    //console.log("SEND TO API:", data);
    return api.put('store/cart/update/',{
            product_id:data.productId || data.product_id,
            quantity: data.quantity
    })
}

export const removeFromCartAPI = (productId) =>{
    //console.log("Deleting product:", productId);
    return api.delete('store/cart/delete/',{
        data: {product_id:productId}
    });
}