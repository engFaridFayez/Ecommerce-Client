<script setup>
import { useToastStore } from "@/stores/toastStore";

const toastStore = useToastStore();
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50 space-y-3">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="px-6 py-5 rounded-lg text-white shadow-lg animate-slide-in"
      :class="{
        'bg-green-600': toast.type === 'success',
        'bg-red-600': toast.type === 'error',
        'bg-blue-600': toast.type === 'info',
      }"
    >
      {{ toast.message }}
    </div>
  </div>
</template>


<style>
@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease;
}
</style>