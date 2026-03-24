<script setup>
import offer from '@/assets/images/offer.jpg'
</script>

<template>
  <div class="bg-white grid-cols-12">
    <div class="bg-white grid grid-cols-12">
      <div class="col-span-1"></div>

      <div
        class="col-span-10 border-4 border-purple-500 mx-20 my-10 rounded-3xl shadow-xl"
      >
        <!-- Offer Card -->
        <div
          class="flex flex-col md:flex-row items-center justify-between bg-linear-to-r from-purple-700 to-indigo-600 text-white rounded-2xl p-8 relative overflow-hidden"
        >
          <!-- Text -->
          <div class="z-10">
            <h2 class="text-3xl font-bold mb-3">🔥 Special Offer</h2>
            <p class="text-lg mb-4">
              Get up to 50% discount on selected products
            </p>

            <button
              class="bg-white text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Shop Now
            </button>
          </div>

          <!-- Image -->
          <div class="mt-6 md:mt-0">
            <img
              :src=offer
              alt="offer"
              class="rounded-xl shadow-lg w-full h-70 object-cover"
            />
          </div>

          <!-- Decoration Circle -->
          <div
            class="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
          ></div>
          <div
            class="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"
          ></div>
        </div>
      </div>

      <div class="col-span-1"></div>
    </div>
  </div>
</template>
