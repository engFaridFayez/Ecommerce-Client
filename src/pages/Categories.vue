<script setup>
import { useCategoryStore } from "@/stores/categoryStore";
import { onMounted } from "vue";

const categoryStore = useCategoryStore();

onMounted(async () => {
  categoryStore.getCategoryMethod();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Title -->
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Categories</h1>

    <!-- Loading -->
    <div v-if="categoryStore.loading" class="text-gray-500">
      Loading categories...
    </div>

    <!-- Error -->
    <div v-else-if="categoryStore.error" class="text-red-500">
      {{ categoryStore.error }}
    </div>

    <!-- Grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="cat in categoryStore.categories"
        :key="cat.id"
        class="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group cursor-pointer"
      >
        <router-link to="/sub-categories">
          <!-- Image -->
          <div class="h-40 overflow-hidden">
            <img
              :src="cat.image"
              class="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              :alt="cat.name"
            />
          </div>
          <!-- Content -->
          <div class="p-4">
            <h2 class="text-2xl font-semibold text-gray-800">
              {{ cat.name }}
            </h2>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
