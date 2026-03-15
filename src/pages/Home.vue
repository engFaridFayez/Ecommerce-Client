<script setup>
    import { onMounted } from 'vue';
    import { getProducts } from '@/api/product';

    onMounted(async ()=>{

        const response = await getProducts()

        console.log(response.data);
        
    })
</script>

<template>
    <div>
        <h1>Home Page</h1>
    </div>
</template>