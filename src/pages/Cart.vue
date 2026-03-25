<script setup>
import { useCartStore } from '@/stores/CartStore';
import { onMounted,computed } from 'vue';

const CartStore = useCartStore()



onMounted(async () =>{
    await CartStore.fetchCart()
});

const getImageUrl = (path) => {
  if(!path) return "";
  return `http://127.0.0.1:8000${path}`;  // لاحظ إزالة /api/
};

const cartTotal = computed(() => {
  return CartStore.items.reduce((sum, item) => sum + item.total_price, 0);
});

</script>


<template>
  <div class="min-h-screen bg-gray-50 p-6">

    <!-- Title -->
    <h1 class="text-3xl font-bold text-purple-700 mb-6">
      Shopping Cart
    </h1>

    <div class="grid grid-cols-12 gap-6">

      <!-- Items -->
      <div class="col-span-12 lg:col-span-8 space-y-4">

        <div
          v-for="item in CartStore.items"
          :key="item.productId"
          class="bg-white p-4 rounded-2xl shadow flex items-center gap-4"
        >
          <!-- Image -->
          <img
            :src="getImageUrl(item.product.image)"
            class="w-24 h-24 object-cover rounded-xl"
          />

          <!-- Info -->
          <div class="flex-1">
            <h2 class="font-semibold text-lg">
              {{ item.product.name }}
            </h2>

            <p class="text-gray-500 text-sm">
              Quantity: {{ item.quantity }}
            </p>

            <p class="text-purple-700 font-bold">
              ${{ item.total_price }}
            </p>
          </div>

          <!-- Remove -->
          <button
            @click="CartStore.removeItem(item.product.id)"
            class="text-red-500 hover:text-red-700 font-semibold"
          >
            Remove
          </button>
        </div>

        <!-- Empty -->
        <div
          v-if="CartStore.items.length === 0"
          class="text-center text-gray-500 mt-10"
        >
          Your cart is empty 🛒
        </div>

      </div>

      <!-- Summary -->
      <div class="col-span-12 lg:col-span-4">
        <div class="bg-white p-6 rounded-2xl shadow sticky top-6">

          <h2 class="text-xl font-bold mb-4 text-purple-700">
            Order Summary
          </h2>

          <div class="flex justify-between mb-5">
            <span class="font-semibold">Total</span>
            <span class="font-bold text-purple-700">
              ${{ cartTotal }}
            </span>
          </div>

          <button
            class="w-full bg-purple-700 text-white py-3 rounded-xl hover:bg-purple-800 transition font-semibold"
          >
            Checkout
          </button>
        </div>
      </div>

    </div>
  </div>
</template>