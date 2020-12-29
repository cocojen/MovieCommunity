const getters = {
  drawerState: (state) => state.drawerState,

  FetchedMoviesByGenre(state) {
    return state.moviesByGenres
  },

  FetchedMovieDetail(state) {
    console.log(state.movieDetail)
    return state.movieDetail
  },

  LoggedInUserData(state) {
    return state.loggedInUserData
  },

  MyReviewList(state) {
    return state.myReviews
  }
}

export default getters