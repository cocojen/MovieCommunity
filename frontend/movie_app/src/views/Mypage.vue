<template>
  <div class='nomargin'>
      <div class="mypage-header">
          <h1>My Page</h1>
          <hr>
          <h2>내가 작성한 리뷰</h2>
      </div>
    
      <div class="mypage-description">박스를 클릭하여 리뷰페이지로 이동하세요</div>
      <!-- <DropDown/> -->

      <MyPageReview 
      v-for="(review, idx) in MyReviewList" :key="idx"
      class="my-review"
      :review="review"
      />

  </div>
</template>

<script>
import MyPageReview from '../components/MyPageReview.vue'
import {mapGetters} from 'vuex'

export default {
  components: { MyPageReview },
    name: 'Mypage',
    data: function() {
        return {
            myReviews: [],
        }
    },

    computed: {
        ...mapGetters(['MyReviewList'])
    },
    methods: {
        getMyReviews(){
            this.$store.dispatch('FETCH_MY_REVIEWS')
        },
    },
    created: function() {
        this.getMyReviews()
    },
}
</script>

<style>

.mypage-header {
    font-family: 'Ubuntu', sans-serif;
    margin-left: 3%;
}

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