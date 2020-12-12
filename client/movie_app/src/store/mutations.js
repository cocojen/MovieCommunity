import axios from 'axios'
import {Authentication} from './state.js'


const mutations = {
  

  fetchLoggedInUserData(state) {
    state.loggedInUserData = Authentication.fetchUserData()
  },

  toggleDrawerState (state, data) {
    state.drawerState = data
  },

  fetchMovieDetail(state, movieId) {

    const myToken = localStorage.getItem('jwt')
    axios.get(`http://3.35.18.1/api/v1/movie_community/movies/${movieId}/reviews`, {params:{}, headers: {'Authorization' : 'JWT ' + myToken }})
    .then(res=>{
      const acts = res.data.actors.split(',')
      state.movieDetail.reviews = res.data.reviews
      state.movieDetail.movieInfo = res.data
      state.movieDetail.actors = acts.slice(0,5)
      state.movieDetail.length_of_reviews = res.data.reviews.length
    })
    .catch(err => {
      console.log(err)
    })
  },
}

export default mutations