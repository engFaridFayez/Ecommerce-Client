<script setup>
import { ref } from "vue";

const isOpen = ref(false);


const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <nav >
    <div class="max-w-400 mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="text-2xl font-bold text-purple-300 ">MyStore</div>

        <!-- Links -->
        <div class="hidden md:flex space-x-8 pr-5 pl-5">
          <a href="#" class="text-white hover:text-purple-400 transition"
            >Home</a
          >
          <a href="#" class="text-white hover:text-purple-400 transition"
            >Products</a
          >
          <a href="#" class="text-white hover:text-purple-400 transition"
            >Categories</a
          >
          <a href="#" class="text-white hover:text-purple-400 transition"
            >About</a
          >
        </div>
        <div>
          <form class="hidden md:flex items-center max-w-md mx-auto">
            <label for="simple-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-[#4F0A9C] focus:border-[#4F0A9C] focus:outline-none block w-full ps-10 p-2.5"
                placeholder="Search products..."
              />
            </div>
            <button
              type="submit"
              class="p-2.5 ms-2 text-sm font-medium text-white bg-[#4F0A9C] rounded-lg border border-blue-700 hover:bg-purple-800 focus:ring-4 focus:outline-red-500 focus:ring-blue-300"
            >
              <svg
                class="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </form>
        </div>

        <!-- Right Side -->
        <div class="flex items-center space-x-4 pl-5">
          <button
            class="bg-[#4F0A9C] text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition"
          >
            Login
          </button>
          <button
            class="bg-purple-100 text-[#4F0A9C] px-4 py-2 rounded-lg hover:bg-purple-300 transition"
          >
            Sign up
          </button>

          <!-- Mobile Button -->
          <button @click="toggleMenu" class="md:hidden text-2xl text-gray-700">
            ☰
          </button>
        </div>
      </div>
    </div>
    <div v-if="isOpen" class="md:hidden space-y-4 mt-5 pb-4">
      <div class="flex flex-col items-center space-y-6 bg-purple-300">
        <form class="flex items-center space-x-2 mt-3">
          <label for="simple-search" class="sr-only">Search</label>
          <div class="relative w-full">
            <input
              type="text"
              id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-[#4F0A9C] focus:border-[#4F0A9C] focus:outline-none block w-full ps-10 p-2.5"
              placeholder="Search products..."
            />
          </div>
          <button
            type="submit"
            class="p-2.5 ms-2 text-sm font-medium text-white bg-[#4F0A9C] rounded-lg border border-blue-700 hover:bg-purple-800 focus:ring-4 focus:outline-red-500 focus:ring-blue-300"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </form>
        <a href="#" class="hover:text-[#4F0A9C]">Home</a>
        <a href="#" class="hover:text-[#4F0A9C]">Products</a>
        <a href="#" class="hover:text-[#4F0A9C]">Categories</a>
        <a href="#" class="hover:text-[#4F0A9C] mb-5">About</a>
      </div>
    </div>
  </nav>
</template>
