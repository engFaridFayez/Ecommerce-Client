<script setup>
import { useCartStore } from "@/stores/CartStore";
import { onMounted, computed, ref } from "vue";
import { TrashIcon } from '@heroicons/vue/24/solid'

const isUpdating = ref(false);

const CartStore = useCartStore();
const updateQuantity = async (item, newQuantity) => {
  if (isUpdating.value) return;

  const qty = Number(newQuantity);
  if (!qty || qty < 1) return;

  isUpdating.value = true;

  try {
    await CartStore.updateCart(item.product.id, qty);
    await CartStore.fetchCart();
  } finally {
    isUpdating.value = false;
  }
};

onMounted(async () => {
  await CartStore.fetchCart();
});

const getImageUrl = (path) => {
  if (!path) return "";
  return `http://127.0.0.1:8000${path}`; // لاحظ إزالة /api/
};

const cartTotal = computed(() => {
  return CartStore.items.reduce((sum, item) => sum + item.total_price, 0);
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Title -->
    <h1 class="text-3xl font-bold text-purple-700 mb-6">Shopping Cart</h1>

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

            <p class="text-gray-500 text-sm">Quantity: {{ item.quantity }}</p>
            <div class="flex items-center justify-between gap-2">
              <!-- Quantity -->
              <div>
                <div
                  class="flex items-center border rounded-xl overflow-hidden"
                >
                  <button
                    :disabled="isUpdating"
                    @click="
                      item.quantity > 1 &&
                      updateQuantity(item, item.quantity - 1)
                    "
                    class="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition"
                  >
                    -
                  </button>

                  <input
                    :value="item.quantity"
                    @change="
                      (e) => {
                        const val = Number(e.target.value);
                        if (val >= 1) updateQuantity(item, val);
                      }
                    "
                    type="number"
                    min="1"
                    class="w-12 text-center outline-none"
                  />

                  <button
                    :disabled="isUpdating"
                    @click="updateQuantity(item, item.quantity + 1)"
                    class="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <!-- Add to Cart -->
            </div>

            <p class="text-purple-700 font-bold">${{ item.total_price }}</p>
          </div>

          <!-- Remove -->
          <button
            @click="CartStore.removeFromCart(item.product.id)"
            class="text-white bg-red-600 p-2 rounded-full hover:bg-red-700 transition flex cursor-pointer"
          >
            Remove
            <TrashIcon class="w-5 h-5" />
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
          <h2 class="text-xl font-bold mb-4 text-purple-700">Order Summary</h2>

          <div class="flex justify-between mb-5">
            <span class="font-semibold">Total</span>
            <span class="font-bold text-purple-700"> ${{ cartTotal }} </span>
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
