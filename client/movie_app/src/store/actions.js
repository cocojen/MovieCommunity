import {fetchMoviesByGenre, fetchMovieDetail, createReview, updateReview, deleteReview, fetchMyReviews, createdReviewComment, login, updateMyReviewCheckedDate} from '../api/index'
// import bus from '../utils/bus'

const actions= {

    /// 로컬스토리지에 토큰이 저장되어있는지 확인 후, 
    /// 토큰이 저장되어 있으면 유저 정보 반환, 
    /// 저장되어 있지 않으면 isLoggedIn: false 를 반환
    FETCH_USER_DATA(context) {
      const token = localStorage.getItem('jwt')
      if (token != null) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const userInfo = JSON.parse(jsonPayload)
        const userData = {
          isLoggedIn: true,
          userId: userInfo.user_id,
          username: userInfo.username
        }
        console.log('토큰이 있습니다')
        context.commit('setUserData', userData)
      } else {
        const userData = {
          isLoggedIn: false,
          userId: '',
          username: ''
        }
        console.log('토큰이 없습니다')
        context.commit('setUserData', userData)
      }
    },  

  /// 홈 화면 영화 장르별 리스트 
  async FETCH_MOVIES(context) {
    const response = await fetchMoviesByGenre()
    context.commit('setMoviesByGenre', response.data)
    return response
  },

  // 영화 디테일 정보 
  async FETCH_MOVIE_DETAIL(context, movieId) {
    const response = await fetchMovieDetail(movieId)
    context.commit('setMovieDetail', response)
    return response
  },


  // 리뷰작성 포스트요청
  async CREATE_REVIEW({dispatch}, review) {
      const response = await createReview(review)
      dispatch('FETCH_MOVIE_DETAIL', review.movieId)
      return response
  },

  async UPDATE_MY_REVIEW_CHECKED_DATE(context, movieId) {
    const response = await updateMyReviewCheckedDate(movieId)
    return response
  },

  // 리뷰 업데이트
  async UPDATE_REVIEW({dispatch}, payload) {
    const response = await updateReview(payload)
    dispatch('FETCH_MOVIE_DETAIL', payload.review.movie)
    return response
  },

  // 리뷰 삭제
  async DELETE_REVIEW({dispatch}, review) {
    const response = await deleteReview(review)
    dispatch('FETCH_MOVIE_DETAIL', review.movie)
    return response    
  },

  /// 마이페이지 내가 작성한 리뷰 
  async FETCH_MY_REVIEWS(context) {
    const response = await fetchMyReviews()
    context.commit('setMyReview', response.data)
    return response
  },

  // 대댓글 달기
  async CREATE_REVIEW_COMMENT({dispatch}, payload) {
    const response = createdReviewComment(payload)
    dispatch('FETCH_MOVIE_DETAIL', payload.review.movie)
    return response 
  },

  ///로그인
  async LOGIN({dispatch}, credentials) {
    const response = await login(credentials)
    localStorage.setItem('jwt', response.data.token)
    if (response.status == 200) {
      dispatch('FETCH_USER_DATA') 
    }
    return response     
  }
}


export default actions