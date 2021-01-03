<template>

  <div id="inspire" v-if="LoggedInUserData.isLoggedIn">
    <div class="white bigback">
          <div style="margin: 10%;">
          </div>
          <div class='direction_change' style="height:160px;">
              <span style="width:120px;">
            <strong class='mt-5'>Comedy</strong>
            </span>
            <v-col
              v-for="(movie) in FetchedMoviesByGenre.comedy_movies.slice(0,5)"
              :key="movie.id"
              cols="6"
              md="2"
              class='ml-4 mr-0 mt-4 mb-4'
            >
            <v-hover>
              <v-card   height="150" elevation="hover ? 12 : 2" >
                <v-img class='cardhover' :src="movie.poster_path" @click="goToDetail(movie)"></v-img>
              </v-card>
            </v-hover>
            </v-col>
          </div>
            <!--Comedy-->
          <div style="margin: 20%;" >
          </div>
            <!--Action-->
          <div class='direction_change' style="height:160px;">
            <span style="width:120px;">
            <strong class='mt-5'>Action</strong>
            </span>
            <v-col
              v-for="(movie) in FetchedMoviesByGenre.action_movies.slice(0,5)"
              :key="movie.id"
              cols="6"
              md="2"
               class='ml-4 mt-4 mb-4'
            >
              <v-card height="150" elevation="2">
                <v-img class='cardhover' :src="movie.poster_path" @click="goToDetail(movie)"></v-img>
              </v-card>
            </v-col>
          </div>
            <!--Action-->
          <div style="margin: 20%;" >
          </div>
            <!--Horror-->
          <div class='direction_change' style="height:160px;">
            <span style="width:120px;">
            <strong  class='mt-5'>Horror</strong>
            </span>
            <v-col
              v-for="(movie) in FetchedMoviesByGenre.horror_movies.slice(0,5)"
              :key="movie.id"
              cols="6"
              md="2"
               class='ml-4 mt-4 mb-4'
            >
              <v-card height="150" elevation="2">
                <v-img class='cardhover' :src="movie.poster_path" @click="goToDetail(movie)">
                </v-img>
              </v-card>
            </v-col>
      
          </div>
          <!--Horror -->
          <div style="margin: 20%;">
          </div>
   
            <!--Comedy-->
  
    </div>
  </div>
</template>
 
<script>
import {mapGetters} from 'vuex'

export default {
  name:'MainMovieList',
  data() {
    return {
      movies: [],
      draweer: null,
    }
  },

  computed: {
    ...mapGetters(['FetchedMoviesByGenre', 'LoggedInUserData'])
  },

  created() {
    this.getMovie()
  },
  methods: {

    getMovie() {
      this.$store.dispatch('FETCH_MOVIES')
    },

    goToDetail(movie) {
      this.$store.state.selectedMovie = movie.id
      this.$router.push('/movies/' + movie.id + '/reviews/')
    }
  },
}
</script>

<style scoped>
#inspire {
  /* position: sticky; */
  font-family:'La Belle Aurore','Noto Sans KR','Serif';
  font-size: 40px;
}
.direction_change {
  display: flex;
  padding: 30px;
  background-color: ede6e6;
  box-shadow: 0 0px 0px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}
.cardhover {

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
  cursor : pointer;
}
.cardhover:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}


</style>


