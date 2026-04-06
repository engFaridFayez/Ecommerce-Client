import { defineStore } from "pinia";
import { login, profile, register } from "@/api/auth";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user:null,
        accessToken:null,
        refreshToken:null,
        loading:false,
        error:null,
        image:null,
        bio:null
    }),

    actions:{
        async loginUser(formData){
            this.loading = true
            this.error = null

            try {
                const response = await login(formData)
                //console.log(response);
                

                this.accessToken = response.data.access
                this.refreshToken = response.data.refresh

                this.user = {
                    id: response.data.id,
                    username: response.data.username,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    is_admin: response.data.is_admin,
                    is_active: response.data.is_active
                }

                localStorage.setItem("access",this.accessToken)
                localStorage.setItem("refresh",this.refreshToken)


            } catch (error) {
                this.error = "Invalid Login attempts"
            }finally {
                this.loading = false
            }

        },
        logout() {
            this.user = null
            this.refreshToken = null
            this.accessToken = null

            localStorage.removeItem("access")
            localStorage.removeItem("refresh")
            window.location.reload
        },

        async registerUser(formData) {
            this.loading = true
            this.error = null

            try {
                const response = await register(formData)
                //console.log(response);
            } catch (error) {
                const data = error.response?.data

                if(data?.non_field_errors?.length){
                    this.error = data.non_field_errors[0]
                }else if (data?.username?.length){
                    if (data.username[0].includes("already exists")){
                        this.error = "Username already exists!"
                    }else{
                        this.error = "Username can not be blank"
                    }
                }else if(data?.password?.length) {
                    this.error = "Password can not be blank"
                }else if(data?.confirm_password?.length) {
                    this.error = "Confirm password can not be blank"
                }
                else {
                    this.error = "Registration Failed"
                }
                //console.log(error.response?.data)
            }finally{
                this.loading = false
            }
        },
        loadUserFromLocalStorage() {
            const access = localStorage.getItem("access");
            const refresh = localStorage.getItem("refresh");

            if (access && refresh) {
                this.accessToken = access;
                this.refreshToken = refresh;

                // لو عايز تجيب بيانات المستخدم من الـ token أو من API
                // ممكن تعمل هنا decode لل JWT أو fetch للمعلومات
            }
        },

        async getProfile() {
            this.loading = true
            this.error = null

            try {
                const response =await profile()
                //console.log(response.data);
                this.bio = response.data.bio
                this.image = response.data.image
                
            } catch (error) {
                this.error = "Can't Load Profile!"
            }finally{
                this.loading = false
            }
        },
    }
})