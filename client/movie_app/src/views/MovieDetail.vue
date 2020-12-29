<template>
  <div v-if="movieId">
    <movie-info :movieId="movieId"/>
  </div>
</template>

<script>
import MovieInfo from '@/components/MovieInfo'


export default {
  name:'MovieDetail',
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
      this.movieId = `${this.$route.params.movieId}`
    }
  },

  components:{
    MovieInfo,
  },
}
</script>

<style>

</style>