import axios from 'axios'

const config = {
  baseUrl: 'http://localhost:8000/api/v1/movie_community',
  header: {headers: {'Authorization' : `JWT ${localStorage.getItem('jwt')}` }},
}

/// 홈 화면 영화 장르별 리스트 
function fetchMoviesByGenre() {
  return axios.get(`${config.baseUrl}/movie_list_by_genre/`, config.header)
}


function fetchMovieDetail(movieId) {
  return axios.get(`${config.baseUrl}/movies/${movieId}/reviews`, config.header)
}

function createReview(review) {
  return axios.post(`${config.baseUrl}/movies/${review.movieId}/reviews/`, {content: review.content, star: review.star, movie: review.movieId}, config.header)
}

function updateReview(payload) {
  return axios.put(`${config.baseUrl}/reviews/${payload.review.id}/`, {content: payload.reviewUpdateContent}, config.header)
}

function deleteReview(review) {
  return axios.delete(`${config.baseUrl}/reviews/${review.id}/`, config.header)
}

function createdReviewComment(payload) {
  return axios.post(`${config.baseUrl}/reviews/${payload.review.id}/comments/`, {content: payload.commentContent, review: payload.review.id, movie:payload.movieId}, config.header)
}

function fetchMyReviews() {
  return axios.get(`${config.baseUrl}/user_reviews/`, config.header)
}

function login(credentials) {
  return axios.post(`${config.baseUrl}/accounts/api-token-auth/`, credentials)
}

function updateMyReviewCheckedDate(movieId) {
  return axios.put(`${config.baseUrl}/movies/${movieId}/reviewsChecked`, {content: ''}, config.header)
}


export {
  fetchMoviesByGenre,
  fetchMovieDetail,
  createReview,
  updateReview,
  deleteReview,
  fetchMyReviews,
  createdReviewComment,
  login,
  updateMyReviewCheckedDate
}