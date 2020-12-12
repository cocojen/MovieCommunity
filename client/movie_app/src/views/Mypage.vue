<template>
  <div class='nomargin'>

      <Menu/>
      <h1>my page</h1>
      <hr>
      <h2>내가 작성한 리뷰</h2>
      <br>
    
      <div class="mypage-description">영화 창을 클릭하여 리뷰페이지로 이동하세요</div>
      <!-- <DropDown/> -->

      <MyPageReview 
      v-for="(review, idx) in myReviews" :key="idx"
      class="my-review"
      :review="review"
      />

  </div>
</template>

<script>
import axios from 'axios'
import MyPageReview from '../components/MyPageReview.vue'
import Menu from '../components/Menu.vue'
// import DropDown from '../components/DropDown.vue'
const SERVER_URL = 'http://3.35.18.1:8000/api/v1/movie_community/user_reviews/'

export default {
  components: { MyPageReview, Menu },
    name: 'Mypage',
    data: function() {
        return {
            myReviews: [],
        }
    },
    methods: {
        getMyReviews(){
            console.log('getMyReviews called')
            const myToken = localStorage.getItem('jwt')
            axios.get(SERVER_URL, {params:{}, headers: {'Authorization' : 'JWT ' + myToken }})
                .then(res => {
                    console.log(res.data)
                    this.myReviews = res.data
                    console.log(res.data[1].movie[0][0])
                    this.myReviews = res.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
    },
    created: function() {
        this.getMyReviews()
    },
}
</script>

<style>
.mypage-description {
    margin-top: 3%;
    margin-left: 18px;
}

.nomargin {
    padding: 0px !important;
    margin: 0px !important;
    width: 800px;
    display: flex;
    flex-direction: column;
}
.my-review {
    border-bottom: 0.5px solid #d8d8d8;
}

.myMovie {
    cursor : pointer;
    margin: 2%;
    padding: 4%;
    background-color :#f7f7f7;
    border-radius: 10px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Serif Kr';
}
.starcolor {
  font-size: 13px;
  margin-top:1%; 
  margin-bottom:1%; 
  margin-left:1px; 
  color: goldenrod;
}

</style>