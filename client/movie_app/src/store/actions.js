import axios from 'axios'


const BASE_URL = `http://localhost:8000/api/v1/movie_community`
const actions= {
  // 리뷰작성 포스트요청
  createReview(context, review) {
    const SERVER_URL = `${BASE_URL}/movies/${review.movieId}/reviews/`
    const myToken = localStorage.getItem('jwt')
    const headers = {headers : {'Authorization' : 'JWT ' + myToken }}

    axios.post(SERVER_URL, {content: review.content, star: review.star, movie: review.movieId}, headers)
      .then(res=> {
        console.log(res)
      })
      .catch(err=> {
        console.log(err)
      })
      .finally(()=> {
        console.log('finally')
        context.commit('fetchMovieDetail', review.movieId)
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
  deleteReview(context, review) {
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
        context.commit('fetchMovieDetail', review.movie)
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
}


export default actions