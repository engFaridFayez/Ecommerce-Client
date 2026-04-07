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

export const users = () => {
    return api.get("accounts/users/")
}

export const singleUser = (id) => {
    return api.get(`accounts/users/${id}/`)
}

export const currentUser = () => {
    return api.get('accounts/users/me/')
}

export const deleteUser = (id) => {
    return api.delete(`accounts/users/delete/${id}/`)
}