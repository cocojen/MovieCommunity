<template>
  <div id="homeBack">
    <no-login />
    <main-movie-list class="sticker"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainMovieList from '../components/MainMovieList.vue'
import NoLogin from '../components/NoLogin.vue'

export default {
  name: 'Home',
  components: {
    MainMovieList,
    NoLogin,
  },

  created() {
    this.$store.dispatch('FETCH_USER_DATA')
  },
}
</script>
<style>
.homeBack {
  margin: 0;
  padding:0;
}
.sticker {
  position:sticky;
}
</style>
