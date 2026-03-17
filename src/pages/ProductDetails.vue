<script setup>
import { useProductStore } from '@/stores/productStore';
import { onMounted,watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const productStore = useProductStore()

onMounted(()=>{
    productStore.fetchProductDetails(route.params.slug)
})

watch(() => route.params.slug, (newSlug) => {
  productStore.fetchProductDetails(newSlug)
})
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
    <div v-else-if="productStore.productDetails" 
        class="grid grid-cols-2 gap-10 items-center">
      
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

        <h4 class="text-2xl font-bold">
          
        </h4>

        <p class="text-gray-600 mb-6">
          {{ productStore.productDetails.description }}
        </p>

        <button 
          class="bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition"
        >
          Add to Cart
        </button>
      </div>

    </div>
  </div>

</template>