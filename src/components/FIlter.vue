<script setup>
import { onMounted, computed } from "vue";
import { useCategoryStore } from "@/stores/categoryStore";
import { useProductStore } from "@/stores/productStore";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
onMounted(async () => {
  await categoryStore.getCategoryMethod();
  await productStore.fetchProducts();
});
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-3 space-x-4 mt-15">
    <button
      v-for="category in categoryStore.categories"
      :key="category.id"
      @click="productStore.setCategory(category.id)"
      :class="[
        'cursor-pointer px-3 py-1 rounded-4xl border-2 border-purple-500 bg-purple-400 transition',
        productStore.selectedCategory === category.id
          ? 'bg-purple-950 text-white'
          : 'text-gray-200 hover:bg-indigo-500',
      ]"
    >
      {{ category.name }}
    </button>

    <!-- Clear Button جنبهم -->
    <button
      v-if="productStore.selectedCategory"
      @click="productStore.setCategory(null)"
      class="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
    >
      Clear
    </button>
  </div>
</template>
