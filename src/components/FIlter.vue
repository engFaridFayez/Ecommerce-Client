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
    <aside class="col-span-12 md:col-span-3 lg:col-span-2 bg-gray-800 p-4 h-fit rounded-lg">
      <h2 class="text-lg font-bold text-gray-100 mb-4">Filter by Category</h2>
      <ul class="space-y-2">
        <li
          v-for="category in categoryStore.categories"
          :key="category.id"
          @click="productStore.setCategory(category.id)"
          :class="[
            'cursor-pointer px-3 py-1 rounded hover:bg-indigo-500 transition',
            productStore.selectedCategory === category.id
              ? 'bg-indigo-600 text-white'
              : 'text-gray-200',
          ]"
        >
          {{ category.name }}
        </li>
      </ul>
      <button
        v-if="productStore.selectedCategory"
        @click="productStore.setCategory(null)"
        class="mt-4 px-3 py-1 w-full rounded bg-red-500 text-white hover:bg-red-600 transition"
      >
        Clear Filter
      </button>
    </aside>
</template>