<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import Toast from "./components/Toast.vue";
import Popup from "./components/Popup.vue";
import NavBar from "./components/NavBar.vue";
const showPopup = ref(false);

const handleUnauthorized = () => {
  showPopup.value = true;
};

onMounted(() => {
  window.addEventListener("unauthorized", handleUnauthorized);
});

onUnmounted(() => {
  window.removeEventListener("unauthorized", handleUnauthorized);
});

const goToLogin = () => {
  window.location.href = "/login";
};

const route = useRoute();
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-[#8909b4] via-purple-800 to-indigo-500"
  >
    <Popup
      v-if="showPopup"
      title="Session Expired"
      content="Please login again"
      button="Login"
      type="error"
      @close="showPopup = false"
      @action="goToLogin"
    />
    <!-- Navbar -->
    <NavBar v-if="route.meta.showNav !== false" />

    <!-- Pages -->
    <router-view></router-view>

    <Toast />
  </div>
</template>

<style scoped></style>
