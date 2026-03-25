import { viewCart ,addToCart } from "@/api/cart";
import { defineStore } from "pinia";


export const useCartStore = defineStore("cart",{
    state : () => ({
        items:[],
        loading:false,
        error: null
    }),

    actions:{
        async fetchCart() {
            this.loading = true
            this.error = null

            try {
                const response = await viewCart()
                console.log(response);
                
                this.items = response.data.cart.items
            } catch (error) {
                this.error = error.response?.data || "Error fetching cart";
            }finally{
                this.loading = false
            }
        },

        async addToCart(productId, quantity=1) {
            this.loading = true
            this.error = null

            try {
                const response = await addToCart({product: productId, quantity});
                this.items = response.data.items.map((i) => ({
                    product: i.product,
                    quantity: i.quantity,
                    total_price: i.total_price,
                    productId: i.product.id
        }));
            } catch (err) {
                this.error = err.response?.data || "Failed to add to cart";
            } finally {
                this.loading = false;
            }
            
        },
        
    }
})