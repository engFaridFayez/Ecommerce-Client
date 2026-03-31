<script setup>
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
    authStore.getProfile()
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">

    <!-- Card -->
    <div class="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">

      <!-- Loading -->
      <div v-if="authStore.loading" class="text-center text-gray-500">
        Loading...
      </div>

      <!-- Error -->
      <div v-else-if="authStore.error" class="text-center text-red-500">
        {{ authStore.error }}
      </div>

      <!-- Profile Content -->
      <div v-else class="text-center">

        <!-- Image -->
        <div class="flex justify-center mb-4">
          <img 
            :src="authStore.image" 
            alt="Profile"
            class="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow"
          />
        </div>

        <!-- Name (optional) -->
        <h2 class="text-xl font-bold text-gray-800 mb-2">
          User Name
        </h2>

        <!-- Bio -->
        <p class="text-gray-600 text-sm leading-relaxed">
          {{ authStore.bio || "No bio available" }}
        </p>

        <!-- Divider -->
        <div class="my-4 border-t"></div>

        <!-- Actions -->
        <div class="flex justify-center gap-3">
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Edit Profile
          </button>
          <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-blue-700 transition">
            Your Orders
          </button>
          <button class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
            Logout
          </button>
        </div>

      </div>
    </div>

  </div>
</template>