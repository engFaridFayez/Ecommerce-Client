<template>
  <div
    class="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition duration-300"
  >
    <!-- Product Image -->
    <img
      :src="product.image"
      alt="product"
      class="w-full h-50 object-fill rounded-xl mb-4"
    />

    <!-- Product Name -->
    <h2 class="text-lg font-semibold mb-2">
      {{ product.name }}
    </h2>

    <!-- Price -->
    <p class="text-purple-700 font-bold text-xl mb-3">${{ product.price }}</p>

    <!-- Button -->
    <router-link :to="`/product/${product.slug}`">
      <button
        class="w-full bg-purple-700 text-white py-2 rounded-xl hover:bg-purple-800 transition"
      >
        View Details
      </button>
    </router-link>
  </div>
</template>
<script setup>
defineProps({
  product: Object,
});
</script>
<style scoped></style>
