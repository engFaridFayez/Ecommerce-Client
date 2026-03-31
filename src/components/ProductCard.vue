<script setup>
import { ref, watch, computed } from "vue";
import { useCartStore } from "@/stores/CartStore";
import { useProductStore } from "@/stores/productStore";
import { useToastStore } from "@/stores/toastStore";

const toast = useToastStore();

const cartStore = useCartStore();

const productStore = useProductStore;

const quantity = ref(1);

const addProduct = (productId) => {
  console.log("Adding Product", productId, "Quantity:", quantity.value);
  cartStore.addToCart(productId, quantity.value);
  try {
    toast.showToast("Product Added to you cart ✅")
  } catch (error) {
    toast.showToast("Faild To add product ❌", "error")
  }
  
};

const props = defineProps({
  product: Object,
});

const isOutOfStock = computed(() => {
  return props.product?.stock < 1;
});

watch(quantity, (newVal) => {
  if (newVal > props.product.stock) {
    quantity.value = props.product.stock;
  }
  if (newVal < 1) {
    quantity.value = 1;
  }
});
</script>

<template>
  <div
    class="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300"
  >
    <!-- Product Image -->
    <img
      :src="product.image"
      alt="product"
      class="w-full h-80 object-cover rounded-xl mb-4"
    />

    <!-- Product Name -->
    <h2 class="text-lg font-semibold mb-2">
      {{ product.name }}
    </h2>

    <!-- Price -->
    <div class="flex justify-between">
      <p class="text-purple-700 font-bold text-xl mb-4">${{ product.price }}</p>
      <p v-if="product.stock < 1" class="text-red-500 font-bold">
        Currently unavailable
      </p>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between gap-2">
      <!-- Quantity -->
      <div v-if="!isOutOfStock">
        <div class="flex items-center border rounded-xl overflow-hidden">
          <button
            @click="quantity > 1 && quantity--"
            class="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition"
          >
            -
          </button>

          <input
            v-model.number="quantity"
            type="number"
            min="1"
            :max="product?.stock || 1"
            class="w-12 text-center outline-none"
          />

          <button
            @click="quantity < product.stock && quantity++"
            class="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition"
          >
            +
          </button>
        </div>
      </div>

      <!-- Add to Cart -->
      <button
        @click="addProduct(product.id)"
        :disabled="isOutOfStock"
        class="flex-1 py-2 rounded-xl font-medium transition bg-purple-700 text-white hover:bg-purple-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        {{ isOutOfStock ? "Out of Stock" : "Add" }}
      </button>
    </div>

    <!-- View Details -->
    <router-link :to="`/product/${product.slug}`">
      <button
        class="w-full mt-3 border border-purple-700 text-purple-700 py-2 rounded-xl hover:bg-purple-50 transition"
      >
        View Details
      </button>
    </router-link>
  </div>
</template>
