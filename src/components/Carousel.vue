<script setup>
import { ref ,onMounted,onUnmounted} from "vue";
import caro1 from "@/assets/images/caro1.png";
import caro3 from "@/assets/images/caro3.png";
import caro4 from "@/assets/images/caro4.png";
import caro5 from "@/assets/images/caro5.png";

const slides = [
  { id: 1, image: caro1, title: "Welcome", desc: "This is first slide" },
  { id: 5, image: caro5, title: "Our Products", desc: "Check our products" },
  {
    id: 4,
    image: caro4,
    title: "Best Quality",
    desc: "We provide best quality",
  },
];

const currentIndex = ref(0);
let interval = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.length) % slides.length;
};

onMounted(() =>{
  interval = setInterval(() =>{
    nextSlide();
  }, 5000)
})

onUnmounted(() =>{
  clearInterval(interval)
})
</script>
<template>
  <div
    class="relative w-full h-120 lg:h-90 overflow-hidden rounded-2xl shadow-lg"
  >
    <!-- Slides -->
    <div
      class="flex transition-transform duration-500 h-full"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="slide in slides"
        :key="slide.id"
        class="w-full shrink-0 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 gap-6 h-full"
      >
        <!-- TEXT -->
        <div class="text-white text-center lg:text-left max-w-xl">
          <h1 class="text-3xl sm:text-4xl lg:text-6xl font-bold">
            {{ slide.title }}
          </h1>

          <p class="mt-4 text-lg sm:text-xl lg:text-2xl opacity-80">
            {{ slide.desc }}
          </p>

          <button
            class="mt-6 bg-[#4F0A9C] px-6 py-2 rounded-lg hover:bg-purple-800 transition"
          >
            Shop Now
          </button>
        </div>

        <!-- IMAGE -->
        <img
          :src="slide.image"
          class="w-60 sm:w-75 lg:w-70 h-auto object-cover rounded-xl"
        />
      </div>
    </div>

    <!-- Prev -->
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-2 lg:left-4 -translate-y-1/2 bg-[#4F0A9C]/50 text-white p-2 rounded-full hover:bg-[#4F0A9C]"
    >
      ‹
    </button>

    <!-- Next -->
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-2 lg:right-4 -translate-y-1/2 bg-[#4F0A9C]/50 text-white p-2 rounded-full hover:bg-[#4F0A9C]"
    >
      ›
    </button>

    <!-- Indicators -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      <span
        v-for="(slide, index) in slides"
        :key="slide.id"
        @click="currentIndex = index"
        :class="index === currentIndex ? 'bg-[#4F0A9C]' : 'bg-white'"
        class="w-3 h-3 rounded-full cursor-pointer border"
      ></span>
    </div>
  </div>
</template>