import { defineStore } from "pinia";
import { getProducts ,getProductDetails} from "@/api/product";


export const useProductStore = defineStore("product",{
    state: () => ({
    products:[],
    productDetails:null,
    loading:false,
    error:null
    }),

    actions:{
        async fetchProducts() {
            this.loading = true
            this.error = null

            try{
                const response =await getProducts()                
                this.products = response.data.results
            }
            catch(error){
                this.error = "Failed to load products"
                console.log(error);
            }finally {
                this.loading = false
            }
        },

        async fetchProductDetails(id) {

            if(this.productDetails && this.productDetails.id === id){
                return
            }


            this.loading = true
            this.error = null

            try{
                const response =await getProductDetails(id)
                console.log(response.data);
                this.productDetails = response.data
            }catch(error){
                this.error = "Error fetching this product"
                console.log(error);
            }finally{
                this.loading = false
            }
        }
    }

})


