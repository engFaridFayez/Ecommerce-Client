<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import router from '@/router';

const authStore = useAuthStore()

const form = ref({
    username:"",
    password:"",
    confirm_password:""
})

const submit = async () => {
    await authStore.registerUser(form.value)
    if(!authStore.error){
        router.push('/success')
    }
} 

</script>


<template>
  <div class="min-h-screen flex items-center justify-center bg-linear-to-r from-purple-500 to-purple-700">
    <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h1 class="text-3xl font-bold text-purple-700 mb-6 text-center">Register</h1>

      <p v-if="authStore.error" class="text-red-500 text-center mb-4">
        {{ authStore.error }}
      </p>

      <input 
        v-model="form.username" 
        placeholder="Username" 
        class="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
      <input 
        v-model="form.password" 
        type="password" 
        placeholder="Password" 
        class="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      >
      <input 
        v-model="form.confirm_password" 
        type="password" 
        placeholder="Confirm Password" 
        class="w-full mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      >

      <button 
        @click="submit"
        class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
      >
        Register
      </button>
    </div>
  </div>
</template>