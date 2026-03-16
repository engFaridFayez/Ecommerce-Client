<script setup>
    import { onMounted } from 'vue';
    import { useProductStore } from '@/stores/productStore';
import ProductDetails from './ProductDetails.vue';

    const productStore = useProductStore()

    onMounted(()=>{
        productStore.fetchProducts()
    })
</script>

<template>
    <h1>
        HIIIIIIII
    </h1>
    <div v-if="productStore.loading">
        Loading...
    </div>
    <div v-else>
        <div v-for="product in productStore.products" :key="product.id">
            <router-link :to="`/product/${product.id}`">
                {{ product.name }} - {{ product.price }}
            </router-link>
            
        </div>
    </div>
</template>