<template>
  <div v-if="movieId">
    <Menu/>
    <movie-info :movieId="movieId"/>
  </div>
</template>

<script>
import MovieInfo from '@/components/MovieInfo'
import Menu from '../components/Menu.vue'


export default {
  name:'MovieDetail',
  components:{
    MovieInfo,
    Menu,
  },
  data: function() {
    return {
      movieId : '',
    }
  },

  mounted() {
    this.movieId = `${this.$route.params.movieId}`
  },

  watch: {
    $route(){
      this.updatePage(this.$route.params.movieId)
    }
  },

  methods: {
    updatePage(movieId) {
      console.log('movie id is : ', movieId)
      this.movieId = movieId
    }
  },

  created: function() {
      console.log('route params movie id is !!!')
      console.log(this.movieId)
      console.log(this.$route.params.movieId)
  },
}
</script>

<style>

</style>