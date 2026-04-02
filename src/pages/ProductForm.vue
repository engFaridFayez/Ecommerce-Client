<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
    <h1 class="text-2xl font-bold mb-4">
      {{ isEdit ? "Edit Product" : "Add Product" }}
    </h1>

    <form @submit.prevent="submit" class="space-y-4">
      <div v-if="categories.length">
      <select v-model="form.category" class="w-full border p-2 rounded" placeholder="Select category">
        <option disabled value="">Select category</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
      </div>
      
      <input
        v-model="form.name"
        placeholder="Name"
        class="w-full border p-2 rounded"
      />
      <input
        v-model="form.price"
        type="number"
        placeholder="Price"
        class="w-full border p-2 rounded"
      />
      <input
        v-model="form.stock"
        type="number"
        placeholder="Stock"
        class="w-full border p-2 rounded"
      />
      <textarea
        v-model="form.description"
        placeholder="Description"
        class="w-full border p-2 rounded"
      ></textarea>
      <input
        type="file"
        @change="handleFileChange"
        class="w-full border p-2 rounded"
      />

      <button
        type="submit"
        class="w-full bg-purple-700 text-white py-2 rounded-xl hover:bg-purple-800 transition"
      >
        {{ isEdit ? "Update Product" : "Add Product" }}
      </button>
    </form>
  </div>
</template>
<script setup>
import { reactive, onMounted,ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { useCategoryStore } from "@/stores/categoryStore";

const productStore = useProductStore();
const router = useRouter();
const route = useRoute();
const categoryStore = useCategoryStore()
const categories = ref([])

const form = reactive({
  category:"",
  name: "",
  price: "",
  image: null,
  description: "",
  stock: "",
});

const handleFileChange = (event) => {
  form.image = event.target.files[0];
};

const isEdit = route.params.slug ? true : false;

onMounted(async () => {
  await categoryStore.getCategoryMethod();
  categories.value = categoryStore.categories;

  if (isEdit) {
    await productStore.fetchProductDetails(route.params.slug);

    if (productStore.productDetails) {
      Object.assign(form, {
        ...productStore.productDetails,
        category: productStore.productDetails.category?.id || "",
      });
    }
  }
});

const submit = async () => {
  try {
    //console.log("Submitting category id:", form.category);
    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("description", form.description);
    data.append("stock", form.stock);
    data.append("category", form.category);
    if (form.image) data.append("image", form.image);
    if (!form.category) {
      alert("Please select a category!");
      return;
    }
    if (isEdit) {
      await productStore.updateProductMethod(form.id, data);
    } else {
      await productStore.addProductMethod(data);
    }
    if(!productStore.error){
      router.push("/");
    }
    
  } catch (error) {
    //console.log("ERROR RESPONSE:", error.response.data);
  }
};
</script>
<style scoped></style>
