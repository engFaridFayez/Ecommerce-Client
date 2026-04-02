import { defineStore } from "pinia";
import { getProducts, getProductDetails, addProduct, updateProduct } from "@/api/product";


export const useProductStore = defineStore("product", {
    state: () => ({
        products: [],
        next: null,
        previous: null,
        count: 0,
        productDetails: null,
        loading: false,
        error: null,
        currentPage: 1,
        selectedCategory: null,
    }),

    actions: {

        setCategory(categoryId) {
            this.selectedCategory = categoryId;
            let url = `http://127.0.0.1:8000/api/store/products/`
            if (categoryId) {
                url += `?category=${categoryId}`
            }
            this.fetchProducts(url)
        },
        async fetchProducts(url = null) {
            this.loading = true
            this.error = null

            try {
                const response = await getProducts(url)
                //console.log(response);
                this.products = response.data.results
                this.next = response.data.next
                this.previous = response.data.previous
                this.count = response.data.count

                if (url) {
                    const parseUrl = new URL(url)
                    this.currentPage = Number(parseUrl.searchParams.get("page")) || 1
                } else {
                    this.currentPage = 1
                }
            }
            catch (error) {
                this.error = "Failed to load products"
                //console.log(error);
            } finally {
                this.loading = false
            }
        },

        async fetchProductDetails(slug) {

            if (this.productDetails && this.productDetails.slug === slug) {
                return
            }


            this.loading = true
            this.error = null

            try {
                const response = await getProductDetails(slug)
                //console.log(response.data);
                this.productDetails = response.data
            } catch (error) {
                this.error = "Error fetching this product"
                //console.log(error);
            } finally {
                this.loading = false
            }
        },

        async addProductMethod(data) {
            this.loading = true

            try {
                const response = await addProduct(data)
                this.products.push(response.data)
            } catch (error) {
                console.log("STATUS:", error.response?.status);
                console.log("DATA:", error.response?.data);
                console.log("FULL ERROR:", error);

                this.error = error.response?.data;
            } finally {
                this.loading = false
            }
        },

        async updateProductMethod(slug, data) {
            this.loading = true

            try {
                const response = await updateProduct(slug, data)
                const index = this.products.findIndex(p => p.slug === slug)
                if (index !== -1) {
                    this.products[index] = response.data
                }
            } catch (error) {
                this.error = "Failed to update product"
                //console.log(error);
            } finally {
                this.loading = false
            }
        }
    }

})


