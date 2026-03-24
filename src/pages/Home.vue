<script setup>
import NavBar from '@/components/NavBar.vue';
import Carousel from '@/components/Carousel.vue';
import ProductsList from './ProductsList.vue';
import HeadOffer from '@/components/HeadOffer.vue';
</script>

<template>
<div class="min-h-auto bg-gradient-to-br from-[#8909b4] via-purple-800 to-indigo-500">
    <NavBar />
    <Carousel />
</div>
<div>
    <HeadOffer />
</div>
<div>
    <ProductsList />
</div>
</template>