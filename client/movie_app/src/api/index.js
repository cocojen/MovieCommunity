import axios from 'axios'

const config = {
  baseUrl: 'http://localhost:8000/api/v1/movie_community',
  token = localStorage.getItem('jwt'),
  getHeader: {headers: {'Authorization' : `JWT ${token}` }}
}

/// 홈 화면 영화 장르별 리스트 
function fetchMoviesByGenre() {
  return axios.get(`${config.BASE_URL}/movie_list_by_genre/`, config.getHeader)
}

export {
  fetchMoviesByGenre
}