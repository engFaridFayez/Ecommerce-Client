import api from "./axios";

export const checkout = () => {
    return api.post("store/orders/checkout/")
}

export const viewOrder = () =>{
    return api.get("store/orders/view/")
}