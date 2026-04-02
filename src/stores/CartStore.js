import { viewCart, addToCart, removeFromCartAPI, updateCart } from "@/api/cart";
import { defineStore } from "pinia";


export const useCartStore = defineStore("cart", {
    state: () => ({
        items: [],
        loading: false,
        error: null,
    }),

    getters: {
        cartCount: (state) => {
            return state.items.reduce((total, items) => total + (items.quantity || 0), 0);
        }
    },

    actions: {
        async fetchCart() {
            this.loading = true
            this.error = null

            try {
                const response = await viewCart()
                //console.log(response);
                this.items = response.data.cart?.items || response.data.items || [];
                this.saveCartToLocal();
            } catch (error) {
                this.error = error.response?.data || "Error fetching cart";
            } finally {
                this.loading = false
            }
        },

        async addToCart(productId, quantity = 1) {
            this.loading = true
            this.error = null

            try {
                const response = await addToCart({ product: productId, quantity });
                this.items = response.data.items.map((i) => ({
                    product: i.product,
                    quantity: i.quantity,
                    total_price: i.total_price,
                    productId: i.product.id
                }));
                this.saveCartToLocal();
            } catch (err) {
                this.error = err.response?.data || "Failed to add to cart";    
                
                            
            } finally {
                this.loading = false;
            }
        },

        loadCart() {
            const data = localStorage.getItem("cart")
            if (data) {
                try {
                    this.items = JSON.parse(data);
                } catch (error) {
                    //console.log("Failed to parse cart from localStorage", error);
                    this.items = []
                }

            }
        },

        saveCartToLocal() {
            localStorage.setItem("cart", JSON.stringify(this.items));
        },


        async updateCart(productId, quantity) {
            this.loading = true;
            this.error = null;
            try {
                const res = await updateCart({ productId, quantity });
            } catch (err) {
                this.error = err.response?.data || "Failed to update cart";
            } finally {
                this.loading = false;
            }
        },

        async removeFromCart(productId) {
            this.loading = true;
            this.error = null;
            try {
                const res = await removeFromCartAPI(productId);
                this.items = res.data.items;
            } catch (err) {
                this.error = err.response?.data || "Failed to remove item";
            } finally {
                this.loading = false;
            }
        },

        clearCart() {
            this.cart = [];
            localStorage.removeItem("cart");
        }
    }
})