<template>
  <div id="homeBack">
    <Menu/>
    <NoLogin />
    <MainMovieList class="sticker"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainMovieList from '../components/MainMovieList.vue'
import NoLogin from '../components/NoLogin.vue'
import Menu from '../components/Menu.vue'
// import Menu from './Menu.vue'

export default {
  name: 'Home',
  components: {
    MainMovieList,
    NoLogin,
    Menu,
    // Menu,
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
