<script setup>
import { useProductStore } from "@/stores/productStore";
import { onMounted } from "vue";
import ProductCard from "@/components/ProductCard.vue";
import Pagination from "@/components/Pagination.vue";
import FIlter from "@/components/FIlter.vue";

const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
});
</script>

<template>
  <div class="grid grid-cols-12 gap-6 bg-white">
    <div class="col-span-12">
      <FIlter />
    </div>
    <div class="col-span-1">
    </div>
    <div class="col-span-10">
      <div>
        <h1 class="text-3xl font-bold text-purple-700 mb-4 text-center">
          Products
        </h1>
      </div>

      <div v-if="productStore.loading" class="text-center py-10">
        Loading...
      </div>

      <div v-else>
        <!-- المنتجات -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard
            v-for="product in productStore.products"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- Pagination -->
        <Pagination />
      </div>
    </div>
  </div>
</template>
