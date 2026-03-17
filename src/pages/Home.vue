<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';
import ProductCard from '@/components/ProductCard.vue';

    const productStore = useProductStore()

    onMounted(async () => {
  await productStore.fetchProducts()
  console.log(productStore.products)
})
</script>

<template>
    <h1 class="text-3xl font-bold text-purple-700">
        HIIIIIIII
    </h1>
    <div v-if="productStore.loading">
        Loading...
    </div>
    <div v-else>
        <div class="grid grid-cols-3 gap-6 p-6">
            <ProductCard 
            v-for="product in productStore.products"
            :key="product.id"
            :product="product"
            />
        </div>
    </div>
</template>