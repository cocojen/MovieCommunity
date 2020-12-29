import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import MovieDetail from '../views/MovieDetail.vue'
import Mypage from '../views/Mypage.vue'
import Recommend from '../views/Recommend.vue'
import RegisterMovie from '../views/RegisterMovie.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/mypage',
    name: 'Mypage',
    component: Mypage
  },

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/accounts/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: Login,
  },
  {
    // 동적 라우팅
    path: '/movies/:movieId/reviews', 
    name: 'MovieDetail',
    component: MovieDetail,
  },
  {
    path: '/recommend', 
    name: 'Recommend',
    component: Recommend,
  },
  {
    path: '/register_movie', 
    name: 'RegisterMovie',
    component: RegisterMovie,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
