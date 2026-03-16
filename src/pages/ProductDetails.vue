<script setup>
import { useProductStore } from '@/stores/productStore';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const productStore = useProductStore()

onMounted(()=>{
    productStore.fetchProductDetails(route.params.id)
})


</script>

<template>
    <div v-if="productStore.loading">
        Loading...
    </div>

    <div v-else-if="productStore.error">
        {{ productStore.error }}
    </div>

    <div v-else-if="productStore.productDetails">
        <h2>{{ productStore.productDetails.name }}</h2>
        <p>{{ productStore.productDetails.description }}</p>
        <p>{{ productStore.productDetails.price }}</p>
    </div>

</template>