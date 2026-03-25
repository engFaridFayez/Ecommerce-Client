import { createRouter, createWebHistory } from 'vue-router'
import ProductDetails from '@/pages/ProductDetails.vue'
import ProductForm from '@/pages/ProductForm.vue'
import ProductsList from '@/pages/ProductsList.vue'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Success from '@/pages/Success.vue'
import Cart from '@/pages/Cart.vue'

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
      path: '/product/:slug',
      name:'productDetails',
      component:ProductDetails
    },
    {
      path:'/add-product',
      name:'addProduct',
      component:ProductForm
    },
    {
      path:'/edit-product/:slug',
      name:'editProduct',
      component: () => import("@/pages/ProductForm.vue")
    },
    {
      path:'/cart',
      name:'cart',
      component:Cart
    },

  ],
})



export default router
