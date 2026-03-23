import { createRouter, createWebHistory } from 'vue-router'
import ProductDetails from '@/pages/ProductDetails.vue'
import ProductForm from '@/pages/ProductForm.vue'
import ProductsList from '@/pages/ProductsList.vue'
import Home from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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

  ],
})



export default router
