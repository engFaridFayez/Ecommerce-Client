import { defineStore } from "pinia";
import { currentUser, deleteUser, login, profile, register, singleUser, users } from "@/api/auth";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false,
        error: null,
        image: null,
        bio: null,
        users: [],
    }),

    actions: {

        async deleteUserMethod(id) {
            this.loading = true
            this.error = null

            try {
                const response = await deleteUser(id)
            } catch (error) {
                this.error = "can't delete this user"
            } finally {
                this.loading = false
            }
        },

        async getUsers() {
            this.loading = true
            this.error = null

            try {
                const response = await users()
                console.log(response);
                this.users = response.data.results

            } catch (error) {
                this.error = "Error fetching users"
            } finally {
                this.loading = false
            }
        },

        async getSingleUser(id) {
            if (!id) return   // حماية

            if (this.user && this.user.id == id) {
                return
            }
            this.loading = true
            this.error = null



            try {
                const response = await singleUser(id)
                console.log(response);
                this.user = response.data
            } catch (error) {
                console.log(error.response);

            } finally {
                this.loading = false
            }
        },



        async loginUser(formData) {
            this.loading = true
            this.error = null

            try {
                const response = await login(formData)
                console.log(response);


                this.accessToken = response.data.access
                this.refreshToken = response.data.refresh

                this.user = {
                    id: response.data.id,
                    username: response.data.username,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    is_admin: response.data.is_admin,
                    is_active: response.data.is_active,
                    role: response.data.role
                }

                localStorage.setItem("access", this.accessToken)
                localStorage.setItem("refresh", this.refreshToken)


            } catch (error) {
                this.error = "Invalid Login attempts"
            } finally {
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
                console.log(response);
            } catch (error) {
                const data = error.response?.data

                if (data?.non_field_errors?.length) {
                    this.error = data.non_field_errors[0]
                } else if (data?.username?.length) {
                    if (data.username[0].includes("already exists")) {
                        this.error = "Username already exists!"
                    } else {
                        this.error = "Username can not be blank"
                    }
                } else if (data?.password?.length) {
                    this.error = "Password can not be blank"
                } else if (data?.confirm_password?.length) {
                    this.error = "Confirm password can not be blank"
                }
                else {
                    this.error = "Registration Failed"
                }
                console.log(error.response?.data)
            } finally {
                this.loading = false
            }
        },
        async loadUserFromLocalStorage() {
            const access = localStorage.getItem("access");
            const refresh = localStorage.getItem("refresh");

            if (access && refresh) {
                this.accessToken = access;
                this.refreshToken = refresh;

                await this.loadCurrentUser()


            }
        },

        async loadCurrentUser() {
            this.loading = true
            this.error = null

            try {
                const response = await currentUser()

                this.user = {
                    id: response.data.id,
                    username: response.data.username,
                    first_name: response.data.first_name,
                    email: response.data.email,
                    phone: response.data.phone,
                    age: response.data.age,
                    last_name: response.data.last_name,
                    is_admin: response.data.is_admin,
                    is_active: response.data.is_active,
                    role: response.data.role,
                    last_login: response.data.last_login,
                    is_staff: response.data.is_staff,
                    bio: response.data.bio,
                    image: response.data.image,
                }
            } catch (error) {
                console.error("Failed to load current user:", error)
                this.error = "Failed to load user data"
            } finally {
                this.loading = false
            }
        },

        async getProfile() {
            this.loading = true
            this.error = null

            try {
                const response = await profile()
                //console.log(response.data);
                this.bio = response.data.bio
                this.image = response.data.image

            } catch (error) {
                this.error = "Can't Load Profile!"
            } finally {
                this.loading = false
            }
        },
    }
})