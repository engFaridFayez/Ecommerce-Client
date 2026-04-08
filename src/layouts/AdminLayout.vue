<script setup>
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};
</script>

<template>
  <div class="flex h-screen bg-gray-100">

    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white flex flex-col">

      <div class="p-5 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>

      <nav class="flex-1 p-4 space-y-2">

        <!-- Dashboard -->
        <RouterLink
          to="/admin"
          :class="[
            'block px-4 py-2 rounded-lg transition',
            isActive('/admin')
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          ]"
        >
          Dashboard
        </RouterLink>

        <!-- Products -->
        <RouterLink
          to="/products"
          :class="[
            'block px-4 py-2 rounded-lg transition',
            isActive('/products')
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          ]"
        >
          Products
        </RouterLink>

        <!-- Categories -->
        <RouterLink
          to="/categories"
          :class="[
            'block px-4 py-2 rounded-lg transition',
            isActive('/categories')
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          ]"
        >
          Categories
        </RouterLink>

        <!-- Orders -->
        <RouterLink
          to="/orders"
          :class="[
            'block px-4 py-2 rounded-lg transition',
            isActive('/orders')
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          ]"
        >
          Orders
        </RouterLink>

        <!-- Users -->
        <RouterLink
          to="/admin/users"
          :class="[
            'block px-4 py-2 rounded-lg transition',
            route.path.startsWith('/admin/users')
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          ]"
        >
          Users
        </RouterLink>

        <div class="border-t border-gray-700 my-3"></div>

        <RouterLink
          to="/"
          class="block px-4 py-2 rounded-lg text-red-300 hover:bg-red-500 hover:text-white transition"
        >
          Back to Site
        </RouterLink>

      </nav>
    </aside>

    <!-- Main -->
    <div class="flex-1 flex flex-col">

      <header class="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 class="font-semibold text-lg">Admin Dashboard</h1>
        <span class="text-gray-600">Welcome {{ authStore.user.username }}</span>
      </header>

      <main class="p-6 overflow-auto">
        <router-view />
      </main>

    </div>
  </div>
</template>