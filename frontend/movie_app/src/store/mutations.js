import bus from '../utils/bus'

const mutations = {
  
  setMoviesByGenre(state, data) {
    state.moviesByGenres = data.movies_by_genre
  },

  setUserData(state, userData) {
    console.log('set user data after commit')
    console.log(userData)
    state.loggedInUserData = userData
  },

  toggleDrawerState (state, data) {
    state.drawerState = data
  },

  setMovieDetail(state, res) {
    const acts = res.data.actors.split(',')
    state.movieDetail.reviews = res.data.reviews
    state.movieDetail.movieInfo = res.data
    state.movieDetail.actors = acts.slice(0,5)
    state.movieDetail.length_of_reviews = res.data.reviews.length
    bus.$emit('end:spinner')
  },

  setMyReview(state, res) {
    state.myReviews = res
  },
}

export default mutations