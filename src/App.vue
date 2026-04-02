<script setup>
import { useRoute } from 'vue-router';
import Toast from './components/Toast.vue';
import NavBar from './components/NavBar.vue';

const route = useRoute();
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-[#8909b4] via-purple-800 to-indigo-500">
    
    <!-- Navbar -->
    <NavBar v-if="route.meta.showNav !== false" />

    <!-- Pages -->
    <router-view></router-view>

    <Toast />
  </div>
</template>

<style scoped>

</style>
