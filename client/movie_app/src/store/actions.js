import axios from 'axios'
import bus from '../utils/bus'

const BASE_URL = 'http://localhost:8000/api/v1/movie_community'

const actions= {

    /// 로컬스토리지에 토큰이 저장되어있는지 확인 후, 
    /// 토큰이 저장되어 있으면 유저 정보 반환, 
    /// 저장되어 있지 않으면 isLoggedIn: false 를 반환
    FETCH_USER_DATA(context) {
      console.log('fetch user data')
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
      const myToken = localStorage.getItem('jwt')
      axios.get(`${BASE_URL}/movie_list_by_genre/`, {headers: {'Authorization' : 'JWT ' + myToken }})
      .then(res=>{
        context.commit('setMoviesByGenre', res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    },

  // 영화 디테일 정보 
  FETCH_MOVIE_DETAIL(context, movieId) {

    const myToken = localStorage.getItem('jwt')
    axios.get(`${BASE_URL}/movies/${movieId}/reviews`, {params:{}, headers: {'Authorization' : 'JWT ' + myToken }})
    .then(res=>{
      context.commit('setMovieDetail', res)
      bus.$emit('end:spinner')
    })
    .catch(err => {
      console.log(err)
    })
  },


  // 리뷰작성 포스트요청
  CREATE_REVIEW({dispatch}, review) {
    const SERVER_URL = `${BASE_URL}/movies/${review.movieId}/reviews/`
    const myToken = localStorage.getItem('jwt')
    const headers = {headers : {'Authorization' : 'JWT ' + myToken }}

    axios.post(SERVER_URL, {content: review.content, star: review.star, movie: review.movieId}, headers)
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

  updateMyReviewCheckedDate(context, movieId) {
    const SERVER_URL = `${BASE_URL}/movies/${movieId}/reviewsChecked`
    const myToken = localStorage.getItem('jwt')
    const headers = {headers : {'Authorization' : 'JWT ' + myToken }}
    axios.put(SERVER_URL, {content: ''}, headers)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  },

  // 리뷰 업데이트
  updateReview(context, payload) {
    const SERVER_URL = `${BASE_URL}/reviews/${payload.review.id}/`
    const myToken = localStorage.getItem('jwt')
    const headers = {headers : {'Authorization' : 'JWT ' + myToken }}
    axios.put(SERVER_URL, {content: payload.reviewUpdateContent}, headers)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        context.commit('fetchMovieDetail', payload.review.movie)
      })
  },

  // 리뷰 삭제
  deleteReview({dispatch}, review) {
    const myToken = localStorage.getItem('jwt')
    const SERVER_URL = `${BASE_URL}/reviews/${review.id}/`

    axios.delete(SERVER_URL, {params:{}, headers: {'Authorization' : 'JWT ' + myToken }})
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        dispatch('fetchMovieDetail', review.movie)
      }) 
    
  },

  /// 마이페이지 내가 작성한 리뷰 
  FETCH_MY_REVIEWS(context) {
    const myToken = localStorage.getItem('jwt')
    axios.get(`${BASE_URL}/user_reviews/`, {params:{}, headers: {'Authorization' : 'JWT ' + myToken }})
      .then(res => {
          console.log(res.data)
          context.commit('setMyReview', res.data)
      })
      .catch(err => {
          console.log(err)
      })
  },

  // 대댓글 달기
  createReviewComment(context, payload) {
    const myToken = localStorage.getItem('jwt')
    const SERVER_URL = `${BASE_URL}/reviews/${payload.review.id}/comments/`
    const headers = {headers : {'Authorization' : 'JWT ' + myToken }}

    axios.post(SERVER_URL, {content: payload.commentContent, review: payload.review.id, movie:payload.movieId}, headers)
        .then(res=>{
          console.log(res)
        })
        .catch(err=> {
          console.log(err)
        })
        .finally(() => {
          context.commit('fetchMovieDetail', payload.review.movie)
        }) 
  },

  ///로그인
  LOGIN({dispatch}, credentials) {
    console.log('login')
    axios.post(`${BASE_URL}/accounts/api-token-auth/`, credentials)
    .then(res => {
      localStorage.setItem('jwt', res.data.token)
      // this.$router.push({name: 'Home'})
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