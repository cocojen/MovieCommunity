<template>
  <v-autocomplete
    v-model="newTag"
    :items="entries"
    :search-input.sync="search"
    placeholder="영화를 검색하세요"
    clearable
    return-object
    @keypress.enter="goToDetail(search)"
    class='searchinput'
  ></v-autocomplete>
</template>

<script>
const BASE_URL = 'http://localhost:8000/api/v1/movie_community/all_movies/'   
import axios from 'axios'

export default {
  name:'SearchBar',
  data () {
    return {
      newTag: '',
      entries: [],
      queryTerm: ''
    }
  },
  computed: {
    search: {
      get () {
        return this.queryTerm
      },
      set (searchInput) {
        if (this.queryTerm !== searchInput) {
          this.queryTerm = searchInput
          this.loadEntries()
        }
      }
    }
  },
  created () {
    this.loadEntries()
  },
  methods: {
    loadEntries() {
      const myToken = localStorage.getItem('jwt')
      axios.get(BASE_URL, {params:{}, headers: {'Authorization' : 'JWT ' + myToken }})
      .then(res=>{
        res.data.forEach(element => {
          this.entries.push(element.title)
        });
      })
      .catch(err => {
        console.log(err)
      })
    },
    goToDetail(search) {
      console.log('entered')
      const myToken = localStorage.getItem('jwt')
      axios.get(BASE_URL, {params:{}, headers: {'Authorization' : 'JWT ' + myToken }})
      .then(res=>{
        res.data.forEach(element => {
          if (search === element.title){
            return this.$router.push({ name: 'MovieDetail', params: { movieId: element.id }})
            }
          });
      })
    },

  }

}
</script>

<style>
.searchinput {
  
  margin-left: 10%;
  margin-right: 10%;
}
</style>