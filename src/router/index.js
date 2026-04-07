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
import Profile from '@/pages/Profile.vue'
import Orders from '@/pages/Orders.vue'
import Users from '@/pages/Users.vue'
import UserDetails from '@/pages/UserDetails.vue'
import AddUser from '@/pages/AddUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta :{showNav : true}
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta :{showNav : true}
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta :{showNav : true}
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
      meta :{showNav : true}
    },
    {
      path: '/categories',
      name: 'categoriesList',
      component: Categories,
      meta :{showNav : true}
    },
    {
      path: '/product/:slug',
      name:'productDetails',
      component:ProductDetails,
      meta :{showNav : true}
    },
    {
      path:'/add-product',
      name:'addProduct',
      component:ProductForm,
      meta: {
        requiresAuth: true,
        showNav:true,
      }
    },
    {
      path:'/edit-product/:slug',
      name:'editProduct',
      component: () => import("@/pages/ProductForm.vue"),
      meta: {
        requiresAuth: true,
        showNav:true,
      }
    },
    {
      path:'/cart',
      name:'cart',
      component:Cart,
      meta :{showNav : true}
    },
    {
      path:'/profile',
      name:"profile",
      component:Profile,
      meta: {
        requiresAuth: true,
        showNav:true,
      }
    },
    {
      path:'/orders',
      name:"orders",
      component:Orders,
      meta: {
        requiresAuth: true,
        showNav:true,
      }
    },
    {
      path:"/users",
      name:"users",
      component:Users
    },
    {
      path:"/add-user",
      name:"add-user",
      component:AddUser
    },
    {
      path:"/users/:id",
      name:"user-details",
      component:UserDetails
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
