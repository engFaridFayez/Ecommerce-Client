<script setup>
import { useAuthStore } from "@/stores/authStore";
import { onMounted } from "vue";
import Popup from "@/components/Popup.vue";
import { ref } from "vue";

const showPopup = ref(false);
const selectedUserId = ref(null);

const openDeletePopup = (id) => {
  selectedUserId.value = id;
  showPopup.value = true;
};

const authStore = useAuthStore();

const confirmDelete = async () => {
  await authStore.deleteUserMethod(selectedUserId.value);
  await authStore.getUsers();
  showPopup.value = false;
};
const closePopup = () => {
  showPopup.value = false;
  selectedUserId.value = null;
};

onMounted(() => {
  authStore.loadUserFromLocalStorage();
  authStore.getUsers();
});
</script>

<template>
  <Popup
    v-if="showPopup"
    title="Delete User"
    content="Are you sure you want to delete this user?"
    button="Delete"
    type="warning"
    button-color="delete"
    @close="closePopup"
    @action="confirmDelete"
  />
  <div class="p-4 md:p-6 bg-gray-100 min-h-screen">
    <div class="flex justify-between">
      <h1 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Users Management
      </h1>
      <div v-if="authStore.user && authStore.user.role === 'manager'">
        <router-link
          to="/admin/add-user"
          class="px-3 p-2 text-lg h-fit bg-black text-white rounded-2xl"
        >
          Add User
        </router-link>
      </div>
    </div>

    <!-- ================= DESKTOP TABLE ================= -->
    <div class="hidden md:block bg-white rounded-2xl shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left text-gray-600">
          <thead class="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th class="px-6 py-4">User</th>
              <th class="px-6 py-4">Role</th>
              <th class="px-6 py-4">Email</th>
              <th class="px-6 py-4">Last Login</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="user in authStore.users"
              :key="user.id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="px-6 py-4 font-medium text-gray-800">
                {{ user.username }}
              </td>

              <td class="px-6 py-4">
                <span
                  class="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600"
                >
                  {{ user.role }}
                </span>
              </td>

              <td class="px-6 py-4">
                {{ user.email || "N/A" }}
              </td>

              <td class="px-6 py-4">
                {{
                  user.last_login
                    ? new Date(user.last_login).toLocaleString()
                    : "Never"
                }}
              </td>

              <td class="px-6 py-4">
                <span
                  class="px-2 py-1 text-xs rounded-full"
                  :class="
                    user.is_active
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-200 text-gray-600'
                  "
                >
                  {{ user.is_active ? "Active" : "Inactive" }}
                </span>
              </td>

              <td class="px-6 py-4 text-right space-x-2">
                <router-link
                  :to="`/admin/users/${user.id}`"
                  class="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg"
                  >View</router-link
                >
                <router-link
                  :to="`/admin/edit-user/${user.id}`"
                  class="px-3 py-1 text-xs bg-yellow-500 text-white rounded-lg"
                >
                  Edit
                </router-link>
                <button
                  @click="openDeletePopup(user.id)"
                  class="px-3 py-1 text-xs bg-red-500 text-white rounded-lg cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ================= MOBILE CARDS ================= -->
    <div class="grid gap-4 md:hidden">
      <div
        v-for="user in authStore.users"
        :key="user.id"
        class="bg-white p-4 rounded-xl shadow"
      >
        <div class="flex justify-between items-center mb-2">
          <h2 class="font-semibold text-gray-800">
            {{ user.username }}
          </h2>

          <span
            class="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full"
          >
            {{ user.role }}
          </span>
        </div>

        <p class="text-sm text-gray-500">
          {{ user.email || "No Email" }}
        </p>

        <p class="text-xs text-gray-400 mt-1">
          Last Login:
          {{
            user.last_login
              ? new Date(user.last_login).toLocaleString()
              : "Never"
          }}
        </p>

        <div class="mt-3 flex gap-2 flex-wrap">
          <span
            class="text-xs px-2 py-1 rounded-full"
            :class="
              user.is_active
                ? 'bg-green-100 text-green-600'
                : 'bg-gray-200 text-gray-600'
            "
          >
            {{ user.is_active ? "Active" : "Inactive" }}
          </span>
        </div>

        <div class="mt-4 flex gap-2">
          <button class="flex-1 py-1 text-xs bg-blue-500 text-white rounded-lg cursor-pointer">
            View
          </button>
          <button
            class="flex-1 py-1 text-xs bg-yellow-500 text-white rounded-lg cursor-pointer"
          >
            Edit
          </button>
          <button class="flex-1 py-1 text-xs bg-red-500 text-white rounded-lg cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
