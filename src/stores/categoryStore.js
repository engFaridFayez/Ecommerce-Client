import { getCategories } from "@/api/category";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category",{
    state: () =>({
        categories:[],
        loading:false,
        error:null
    }),

    actions:{
        async getCategoryMethod(){
            this.loading = true
            this.error = null

            try{
                const response = await getCategories()
                //console.log(response);
                this.categories = response.data
            }catch(error){
                this.error = "Failed to load categories"
                //console.log(error);
            }finally {
                this.loading = false
            }
        }
    }
})