<script setup>
import { useAuthStore } from "@/stores/authStore";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const form = reactive({
  username: "",
  first_name: "",
  last_name: "",
  role: "",
  email: "",
  is_staff: "",
  is_active: "",
  is_blocked: "",
  password: "",
  confirm_password: "",
});

const isEdit = route.params.id ? true : false;

onMounted(async () => {
  if (isEdit) {
    await authStore.getSingleUser(route.params.id);

    if (authStore.user) {
      Object.assign(form, {
        ...authStore.user,
      });
    }
  }
});

const submit = async () => {
  try {
    const data = new FormData();

    data.append("username", form.username);

    // ✨ Add
    if (!isEdit) {
      data.append("password", form.password);
      data.append("confirm_password", form.confirm_password);

      await authStore.addUserMethod(data);
    }

    // ✨ Edit
    else {
      data.append("first_name", form.first_name);
      data.append("last_name", form.last_name);
      data.append("email", form.email);
      data.append("role", form.role);
      data.append("is_active", form.is_active);
      data.append("is_staff", form.is_staff);
      data.append("is_blocked", form.is_blocked);

      // optional لو عايز تغير الباسورد
      if (form.password) {
        data.append("password", form.password);
        data.append("confirm_password", form.confirm_password);
      }

      await authStore.editUserMetod(route.params.id, data);
    }

    if (!authStore.error) {
      router.push("/admin/users");
    }
  } catch (error) {}
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 p-4"
  >
    <form
      @submit.prevent="submit"
      class="w-full max-w-lg bg-white rounded-3xl shadow-xl p-8 space-y-6"
    >
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-800">
          {{ isEdit ? "Edit User" : "Add New User" }}
        </h2>
        <p class="text-gray-400 text-sm mt-1">Manage user information easily</p>
      </div>

      <!-- Error -->
      <p v-if="authStore.error" class="text-red-500 text-sm text-center">
        {{ authStore.error }}
      </p>

      <!-- Username -->
      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-600">Username</label>
        <input
          v-model="form.username"
          type="text"
          class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      <!-- Password (Add only) -->
      <div v-if="!isEdit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-600">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-600">Confirm</label>
          <input
            v-model="form.confirm_password"
            type="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
      </div>

      <!-- Edit Fields -->
      <div v-if="isEdit" class="space-y-4 border-t pt-4">
        <h3
          class="text-xs font-semibold text-gray-400 uppercase tracking-wider"
        >
          User Info
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-600">First Name</label>
            <input
              v-model="form.first_name"
              class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-600">Last Name</label>
            <input
              v-model="form.last_name"
              class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-600">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-600">Role</label>
          <select
            v-model="form.role"
            class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            <option value="manager">Manager</option>
            <option value="editor">Editor</option>
            <option value="supplier">Supplier</option>
            <option value="user">User</option>
          </select>
        </div>

        <!-- Checkboxes -->
        <div class="flex gap-6 text-sm text-gray-600">
          <label class="flex items-center gap-2">
            <input type="checkbox" v-model="form.is_active" class="cursor-pointer"/>
            Active
          </label>

          <label class="flex items-center gap-2 ">
            <input type="checkbox" v-model="form.is_staff" class="cursor-pointer" />
            Staff
          </label>
        </div>
      </div>

      <!-- Button -->
      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition cursor-pointer"
      >
        {{ isEdit ? "Save Changes" : "Add User" }}
      </button>
    </form>
  </div>
</template>
