<template>
  <v-container class='back'>
    <!-- 영화 정보 출력 시작-->
    <div class="movieInfo col" style="margin-bottom: 5%; border-radius: 10px;">
      <div class="poster col-3" style="display:inline">
        <img class="imgTag" width=240 height=360 :src="FetchedMovieDetail.movieInfo.poster_path" alt="">
      </div>
      <div class="col-8 description" style="margin-left:4%;">
        <h1>{{ FetchedMovieDetail.movieInfo.title }}</h1>
        <h5 style="color:#ffcc80">RATE</h5> 
          <h5>{{ FetchedMovieDetail.movieInfo.avg_vote }} / 10</h5>
        <br>
        <h3>Actors</h3>
        <div style="font-size:13px;" v-for="(actor,idx) in FetchedMovieDetail.actors" :key='idx'>
          {{ actor }}
        </div>
        <br>
        <h3>Synopsis</h3>
        <p style="margin-bottom:3%;">{{ FetchedMovieDetail.movieInfo.description }}</p>
      </div>
    </div>
    <div style="margin:5%;"></div>
    <!-- 영화 정보 출력 끝-->

    <!-- 리뷰창 시작 : 리뷰 컴포넌트 불러오기 -->
    <div>
    <h3 style="margin-left:1%; margin-bottom:2%">댓글 목록 ({{FetchedMovieDetail.length_of_reviews}}개의 댓글)</h3>
    <!-- for 문 돌면서 리뷰들 하나씩 출력 -->
    <Review
      v-for="(review, idx) in FetchedMovieDetail.reviews"
      :key="idx"
      :review="review"
    />
    </div>
    <br>
    <!-- 리뷰 출력하는 for 문 끝 -->
    
    <!-- 리뷰 작성하는 form 시작 -->
      <!-- 별점 -->
      <v-rating
        v-model="star"
        background-color="orange lighten-3"
        color="orange"
        large
      ></v-rating>
      <!-- 내용 -->
      <v-textarea
        @keypress.enter="createPost"
        v-model="content"
        outlined
        name="input-7-4"
        label="코멘트를 작성해주세요"
        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
      ></v-textarea>
  <!-- 리뷰 작성하는 form 끝 -->
  </v-container>
</template>


<script>
import Review from './Review.vue'
import {mapGetters} from 'vuex'


export default {
  components: { Review },
  name:'MovieInfo',
  computed: {
    ...mapGetters(['FetchedMovieDetail'])
  },

  data() {
    return {
      rating: 0,
      star : 0,
      content : '',
    }
  },

  props: {
    movieId : [String, Number]
  },

  created() {
    this.$store.dispatch('FETCH_MOVIE_DETAIL', this.movieId)
    this.$store.dispatch('updateMyReviewCheckedDate', this.movieId)
  },

  methods: {
    createPost() {
      const content = this.content
      const star = this.star
      const movieId = this.movieId
      this.$store.dispatch('CREATE_REVIEW', {content, star, movieId})
      this.star = 0 
      this.content = ''
    },
  },

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap');

.img {
  /* <img src="paris.jpg" alt="Paris" width="400" height="300"> */
    max-width: 100%;
    max-height: 100%;
    margin-bottom: 2px;
}

v-container {
  font:Source Sans Pro;
}
.movieInfo {
  width: 1100px;
  height: 430px;
  display:flex;
  flex-direction: row;
  position: relative;
  background-color: #f4f4f4;
}
.poster{
  position: relative;

}
.imgTag {
  position: absolute;
  /* margin: auto; */
  top: 5%;
  /* left: 20%;  */
}
</style>