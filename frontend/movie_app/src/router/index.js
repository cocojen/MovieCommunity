import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import MovieDetail from '../views/MovieDetail.vue'
import Mypage from '../views/Mypage.vue'
import Recommend from '../views/Recommend.vue'
import RegisterMovie from '../views/RegisterMovie.vue'
import bus from '../utils/bus'
import store from '../store/index'



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
    path: '/movies/:movieId/reviews', 
    name: 'MovieDetail',
    component: MovieDetail,
    beforeEnter: (to, from, next) => {
      console.log('to', to)
      console.log('from', from)
      bus.$emit('start:spinner')
      store.dispatch('FETCH_MOVIE_DETAIL', to.params.movieId)
        .then(()=>{
          bus.$emit('end:spinner')
          next()
        })
        .catch((err)=>{
          console.log(err)
        })
      store.dispatch('UPDATE_MY_REVIEW_CHECKED_DATE', to.params.movieId)
    }
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
