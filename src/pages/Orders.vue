<script setup>
import { useOrderStore } from "@/stores/orderStore";
import { onMounted } from "vue";

const orderStore = useOrderStore();

onMounted(() => {
  orderStore.viewOrders();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>

    <!-- Orders -->
    <div class="grid gap-6">
      <div
        v-for="order in orderStore.orders"
        :key="order.id"
        class="bg-white rounded-2xl shadow p-5"
      >
        <!-- Header -->
        <div class="flex justify-between mb-3">
          <div>
            <p class="font-semibold">Order #{{ order.id }}</p>
            <p class="text-sm text-gray-500">
              {{ new Date(order.created_at).toLocaleString() }}
            </p>
          </div>

          <span 
            class="px-3 py-2 rounded-4xl text-md font-medium"
            :class="{
              'bg-yellow-100 text-yellow-700': order.status === 'pending',
              'bg-green-100 text-green-700': order.status === 'paid',
              'bg-red-100 text-red-700': order.status === 'cancelled'
            }"
          >
            {{ order.status }}
          </span>
        </div>

        <!-- Items -->
        <div class="space-y-3 mt-4">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex justify-between items-center border-b pb-2"
          >
            <!-- Product Info -->
            <div class="flex items-center gap-3">
              <!-- لو عندك صورة -->
              <img
                v-if="item.product.image"
                :src="`http://127.0.0.1:8000${item.product.image}`"
                class="w-14 h-14 object-cover rounded-lg"
              />

              <div>
                <p class="font-medium text-gray-800">
                  {{ item.product.name }}
                </p>

                <p class="text-sm text-gray-500">
                  Quantity: {{ item.quantity }}
                </p>
              </div>
            </div>

            <!-- Price -->
            <p class="font-semibold text-gray-700">
              {{ item.price_at_purchase }} EGP
            </p>
          </div>
        </div>

        <!-- Total -->
        <div class="text-right mt-4 font-bold text-lg text-gray-800">
          Total:
          {{
            order.items
              .reduce((total, item) => {
                return (
                  total + item.quantity * parseFloat(item.price_at_purchase)
                );
              }, 0)
              .toFixed(2)
          }}
          EGP
        </div>
      </div>
    </div>
  </div>
</template>
