import api from "./axios";

export const login = (data) =>{
    return api.post("accounts/token/",data)
}

export const register = (data)=>{
    return api.post("accounts/register/",data)
}

export const profile = () => {
    return api.get("accounts/users/profile/")
}