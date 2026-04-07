<script setup>
import { useAuthStore } from '@/stores/authStore'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

onMounted(() => {
  authStore.getSingleUser(route.params.id)
})
</script>

<template>
  <div class="p-4 md:p-6 bg-gray-100 min-h-screen">

    <!-- Loading -->
    <div v-if="!authStore.user" class="text-center text-gray-500">
      Loading...
    </div>

    <!-- Content -->
    <div v-else class="max-w-5xl mx-auto">

      <!-- Header -->
      <div class="bg-white rounded-2xl shadow p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        
        <div class="flex items-center gap-4">
          <!-- Avatar -->
          <div class="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
            {{ authStore.user.username.charAt(0).toUpperCase() }}
          </div>

          <!-- Name -->
          <div>
            <h1 class="text-2xl font-bold text-gray-800">
              {{ authStore.user.username }}
            </h1>
            <p class="text-sm text-gray-500">
              {{ authStore.user.first_name || '-' }} {{ authStore.user.last_name || '-' }}
            </p>
          </div>
        </div>

        <!-- Role -->
        <span class="mt-4 md:mt-0 px-4 py-2 text-sm rounded-full bg-blue-100 text-blue-600 w-fit">
          {{ authStore.user.role }}
        </span>
      </div>

      <!-- Info + Status -->
      <div class="grid md:grid-cols-2 gap-6">

        <!-- Info Card -->
        <div class="bg-white rounded-2xl shadow p-6">
          <h2 class="text-lg font-semibold mb-4 text-gray-700">User Info</h2>

          <div class="space-y-3 text-sm text-gray-600">
            <p><strong>Email:</strong> {{ authStore.user.email || 'N/A' }}</p>
            <p>
              <strong>Last Login:</strong>
              {{ authStore.user.last_login 
                ? new Date(authStore.user.last_login).toLocaleString() 
                : 'Never' 
              }}
            </p>
          </div>
        </div>

        <!-- Status Card -->
        <div class="bg-white rounded-2xl shadow p-6">
          <h2 class="text-lg font-semibold mb-4 text-gray-700">Status</h2>

          <div class="flex flex-wrap gap-3">

            <span 
              class="px-3 py-1 text-sm rounded-full"
              :class="authStore.user.is_active 
                ? 'bg-green-100 text-green-600' 
                : 'bg-gray-200 text-gray-600'"
            >
              {{ authStore.user.is_active ? 'Active' : 'Inactive' }}
            </span>

            <span 
              class="px-3 py-1 text-sm rounded-full"
              :class="authStore.user.is_blocked 
                ? 'bg-red-100 text-red-600' 
                : 'bg-green-100 text-green-600'"
            >
              {{ authStore.user.is_blocked ? 'Blocked' : 'Not Blocked' }}
            </span>

            <span 
              v-if="authStore.user.is_staff"
              class="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-600"
            >
              Staff
            </span>

          </div>
        </div>

      </div>

      <!-- Products -->
      <div class="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 class="text-lg font-semibold mb-4 text-gray-700">
          Products
        </h2>

        <div v-if="authStore.user.products?.length">
          <div class="grid md:grid-cols-2 gap-4">
            <div 
              v-for="product in authStore.user.products" 
              :key="product.id"
              class="border rounded-xl p-4 hover:shadow transition"
            >
              <h3 class="font-semibold text-gray-800">
                {{ product.name }}
              </h3>
              <p class="text-sm text-gray-500 mt-1">
                {{ product.price }} EGP
              </p>
            </div>
          </div>
        </div>

        <div v-else class="text-gray-400 text-sm">
          No products available
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex gap-3 justify-end">
        <button class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          Edit User
        </button>

        <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete User
        </button>
      </div>

    </div>
  </div>
</template>