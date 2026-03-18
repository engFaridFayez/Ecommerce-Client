<script setup>
import { onMounted, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useCategoryStore } from "@/stores/categoryStore";
import ProductCard from "@/components/ProductCard.vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";

const productStore = useProductStore();
const categoryStore = useCategoryStore()

const pageSize = 5;

const totalPages = computed(() => {
  return Math.ceil(productStore.count / 5);
});

const currentPage = computed(() => productStore.currentPage);
// بداية ونهاية العناصر المعروضة
const start = computed(() => {
  return (currentPage.value - 1) * pageSize + 1;
});

const end = computed(() => {
  return Math.min(currentPage.value * pageSize, productStore.count);
});

// الانتقال لصفحة معينة
const goToPage = (page) => {
  const url = `http://127.0.0.1:8000/api/store/products/?page=${page}`;
  productStore.fetchProducts(url);
};

onMounted(async () => {
  await productStore.fetchProducts();
  await categoryStore.getCategoryMethod();
  console.log(productStore.products);
});
</script>

<template>
  
  <aside class="w-1/5 bg-gray-800 p-4 rounded-lg">
    <h2 class="text-lg font-bold text-gray-100 mb-4">Filter by Category</h2>
    <ul class="space-y-2">
      <li
        v-for="category in categoryStore.categories"
        :key="category.id"
        @click="productStore.setCategory(category.id)"
        :class="[
          'cursor-pointer px-3 py-1 rounded hover:bg-indigo-500 transition',
          productStore.selectedCategory === category.id ? 'bg-indigo-600 text-white' : 'text-gray-200'
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
  <h1 class="text-3xl font-bold text-purple-700 mb-4">Products</h1>

  <div v-if="productStore.loading" class="text-center py-10">Loading...</div>

  <div v-else>
    <!-- المنتجات -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 p-6">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Pagination -->
    <div
      class="flex items-center justify-between border-t border-gray-700 px-4 py-4"
    >
      <!-- Showing -->
      <p class="text-sm text-gray-300">
        Showing
        <span class="font-medium">{{ start }}</span>
        to
        <span class="font-medium">{{ end }}</span>
        of
        <span class="font-medium">{{ productStore.count }}</span>
        results
      </p>

      <!-- Buttons -->
      <nav class="isolate inline-flex -space-x-px rounded-md">
        <!-- Previous -->
        <button
          @click="productStore.fetchProducts(productStore.previous)"
          :disabled="!productStore.previous"
          class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
        >
          <span class="sr-only">Previous</span>
          <ChevronLeftIcon class="size-5" aria-hidden="true" />
        </button>

        <!-- Page Numbers -->
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'relative inline-flex items-center px-4 py-2 text-sm font-semibold transition',
            page === currentPage
              ? 'z-10 bg-indigo-500 text-white'
              : 'text-gray-200 hover:bg-gray-600',
          ]"
        >
          {{ page }}
        </button>

        <!-- Next -->
        <button
          @click="productStore.fetchProducts(productStore.next)"
          :disabled="!productStore.next"
          class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
        >
          <span class="sr-only">Next</span>
          <ChevronRightIcon class="size-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  </div>
</template>
