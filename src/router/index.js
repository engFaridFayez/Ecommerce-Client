import { createRouter, createWebHistory } from 'vue-router'
import ProductDetails from '@/pages/ProductDetails.vue'
import ProductForm from '@/pages/ProductForm.vue'
import ProductsList from '@/pages/ProductsList.vue'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Success from '@/pages/Success.vue'
import Cart from '@/pages/Cart.vue'
import Categories from '@/pages/Categories.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/success',
      name: 'success',
      component: Success,
    },
    {
      path: '/products',
      name: 'productsList',
      component: ProductsList,
    },
    {
      path: '/categories',
      name: 'categoriesList',
      component: Categories,
    },
    {
      path: '/product/:slug',
      name:'productDetails',
      component:ProductDetails
    },
    {
      path:'/add-product',
      name:'addProduct',
      component:ProductForm,
      meta: {requiresAuth: true}
    },
    {
      path:'/edit-product/:slug',
      name:'editProduct',
      component: () => import("@/pages/ProductForm.vue"),
      meta: {requiresAuth: true}
    },
    {
      path:'/cart',
      name:'cart',
      component:Cart
    },

  ],
})

router.beforeEach((to) => {
  const token = localStorage.getItem("access");

  if (to.meta.requiresAuth && !token) {
    return "/login";
  }
});
export default router
