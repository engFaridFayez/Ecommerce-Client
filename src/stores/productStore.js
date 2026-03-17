import { defineStore } from "pinia";
import { getProducts ,getProductDetails, addProduct, updateProduct} from "@/api/product";


export const useProductStore = defineStore("product",{
    state: () => ({
    products:[],
    currentPage:1,
    totalPages:1,
    productDetails:null,
    loading:false,
    error:null,
    }),

    actions:{
        async fetchProducts(page = 1) {
            this.loading = true
            this.error = null

            try{
                const response =await getProducts()  
                console.log(response);
                
                this.products = response.data.results
            }
            catch(error){
                this.error = "Failed to load products"
                console.log(error);
            }finally {
                this.loading = false
            }
        },

        async fetchProductDetails(slug) {

            if(this.productDetails && this.productDetails.slug === slug){
                return
            }


            this.loading = true
            this.error = null

            try{
                const response =await getProductDetails(slug)
                console.log(response.data);
                this.productDetails = response.data
            }catch(error){
                this.error = "Error fetching this product"
                console.log(error);
            }finally{
                this.loading = false
            }
        },

        async addProductMethod(data) {
            this.loading = true

            try {
                const response = await addProduct(data)
                this.products.push(response.data)
            } catch (error) {
                this.error = "Failed to add product"
                console.log(error);
            }finally{
                this.loading = false
            }
        },

        async updateProductMethod(slug,data){
            this.loading = true

            try {
                const response = await updateProduct(slug,data)
                const index = this.products.findIndex(p=>p.slug === slug)
                if (index !== -1){
                    this.products[index] = response.data
                }
            } catch (error) {
                this.error = "Failed to update product"
                console.log(error);
            }finally{
                this.loading = false
            }
        }
    }

})


