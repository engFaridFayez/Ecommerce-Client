<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/20/solid";
import { computed } from "vue";
import { useProductStore } from "@/stores/productStore";


const productStore = useProductStore();
const pageSize = 10;


const totalPages = computed(() => {
  return Math.ceil(productStore.count / pageSize);
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

  window.scrollTo({
    top:0,
    behavior:"smooth"
  })
};

const goToUrl = async (url) => {
  if(!url) return;

  await productStore.fetchProducts(url);

  window.scrollTo({
    top:0,
    behavior:"smooth"
  })
}
</script>

<template>
  <div
    class="flex items-center justify-between border-t border-gray-700 px-4 py-4"
  >
    <!-- Showing -->
    <p class="text-sm text-black">
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
        @click="goToUrl(productStore.previous)"
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
            ? 'z-10 bg-purple-500 text-white'
            : 'text-black hover:bg-purple-600',
        ]"
      >
        {{ page }}
      </button>

      <!-- Next -->
      <button
        @click="goToUrl(productStore.next)"
        :disabled="!productStore.next"
        class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
      >
        <span class="sr-only">Next</span>
        <ChevronRightIcon class="size-5" aria-hidden="true" />
      </button>
    </nav>
  </div>
</template>
