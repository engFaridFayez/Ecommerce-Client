import { defineStore } from "pinia";
import { checkout, viewOrder } from "@/api/order";


export const useOrderStore = defineStore("order", {
    state: () => ({
        orders: [],
        loading: false,
        error: null
    }),

    actions: {
        async checkoutOrder() {
            this.loading = true
            this.error = null

            try {
                const response = await checkout()
                console.log(response.data);

            } catch (error) {
                console.log("ERROR:", error.response?.data);  // 👈 ده أهم سطر
                this.error = error.response?.data?.message || "can't checkout this order"
            } finally {
                this.loading = false
            }
        }
    }
})