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
    FETCH_MOVIES(context) {
      return fetchMoviesByGenre()
      .then(res=>{
        context.commit('setMoviesByGenre', res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },

  // 영화 디테일 정보 
  FETCH_MOVIE_DETAIL(context, movieId) {

    return fetchMovieDetail(movieId)
    .then(res=>{
      context.commit('setMovieDetail', res)
      
    })
    .catch(err => {
      console.log(err)
    })
  },


  // 리뷰작성 포스트요청
  CREATE_REVIEW({dispatch}, review) {
    return createReview(review)
      .then(res=> {
        console.log(res)
      })
      .then(()=> {
        dispatch('FETCH_MOVIE_DETAIL', review.movieId)
      })
      .catch(err=> {
        console.log(err)
      })
  },

  UPDATE_MY_REVIEW_CHECKED_DATE(context, movieId) {
    return updateMyReviewCheckedDate(movieId)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 리뷰 업데이트
  UPDATE_REVIEW({dispatch}, payload) {
    return updateReview(payload)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        dispatch('FETCH_MOVIE_DETAIL', payload.review.movie)
      })
  },

  // 리뷰 삭제
  DELETE_REVIEW({dispatch}, review) {
    return deleteReview(review)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        dispatch('FETCH_MOVIE_DETAIL', review.movie)
      }) 
    
  },

  /// 마이페이지 내가 작성한 리뷰 
  FETCH_MY_REVIEWS(context) {
    return fetchMyReviews()
      .then(res => {
          context.commit('setMyReview', res.data)
      })
      .catch(err => {
          console.log(err)
      })
  },

  // 대댓글 달기
  CREATE_REVIEW_COMMENT({dispatch}, payload) {
    return createdReviewComment(payload)
        .then(res=>{
          console.log(res)
        })
        .then(() => {
          dispatch('FETCH_MOVIE_DETAIL', payload.review.movie)
        })
        .catch(err=> {
          console.log(err)
        })
  },

  ///로그인
  LOGIN({dispatch}, credentials) {
    return login(credentials)
    .then(res => {
      localStorage.setItem('jwt', res.data.token)
    })
    .catch(err => {
      if (err.response.status === 400) {
        this.errorMessage = "올바른 아이디와 패스워드를 입력해주세요"
      }
    })
    .then(() => {
      dispatch('FETCH_USER_DATA') 
    })
    
  }
}


export default actions