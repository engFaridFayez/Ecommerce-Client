<script setup>
import { useProductStore } from "@/stores/productStore";
import { onMounted, watch,ref,computed } from "vue";
import { useCartStore } from "@/stores/CartStore";
import { useRoute } from "vue-router";

const route = useRoute();
const cartStore = useCartStore();
const productStore = useProductStore();
const quantity = ref(1);
const addProduct = (productId) => {
  console.log("Adding Product", productId, "Quantity:", quantity.value);
  cartStore.addToCart(productId, quantity.value);
};

const isOutOfStock = computed(() => {
  return productStore.productDetails?.stock < 1;
});

onMounted(() => {
  productStore.fetchProductDetails(route.params.slug);
});

watch(
  () => route.params.slug,
  (newSlug) => {
    productStore.fetchProductDetails(newSlug);
  },
);
watch(quantity, (newVal) => {
  if (newVal > productStore.productDetails.stock) {
    quantity.value = productStore.productDetails.stock;
  }
  if (newVal < 1) {
    quantity.value = 1;
  }
});
</script>

<template>
  <div class="p-10">
    <!-- Loading -->
    <div v-if="productStore.loading" class="text-center align-middle text-xl">
      Loading...
    </div>

    <!-- Error -->
    <div v-else-if="productStore.error" class="text-red-500 text-center">
      {{ productStore.error }}
    </div>

    <!-- Product -->
    <div
      v-else-if="productStore.productDetails"
      class="grid grid-cols-2 gap-10 items-center"
    >
      <!-- Image -->
      <div>
        <img
          :src="productStore.productDetails.image"
          class="w-full h-130 rounded-2xl shadow-lg"
        />
      </div>

      <!-- Info -->
      <div>
        <h1 class="text-3xl font-bold mb-4">
          {{ productStore.productDetails.name }}
        </h1>

        <p class="text-purple-700 text-2xl font-semibold mb-4">
          ${{ productStore.productDetails.price }}
        </p>

        <h4 class="text-2xl font-bold"></h4>

        <p class="text-gray-600 mb-6">
          {{ productStore.productDetails.description }}
        </p>

        <div class="flex justify-between">
          <p class="text-purple-700 font-bold text-xl mb-4">
            ${{ productStore.productDetails.price }}
          </p>
          <p v-if="productStore.productDetails.stock < 1" class="text-red-500 font-bold">
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
                :max="productStore.productDetails.stock || 1"
                class="w-12 text-center outline-none"
              />

              <button
                @click="quantity < productStore.productDetails.stock && quantity++"
                class="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition"
              >
                +
              </button>
            </div>
          </div>

          <!-- Add to Cart -->
          <button
            @click="addProduct(productStore.productDetails.id)"
            :disabled="isOutOfStock"
            class="flex-1 py-2 rounded-xl font-medium transition bg-purple-700 text-white hover:bg-purple-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {{ isOutOfStock ? "Out of Stock" : "Add" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
