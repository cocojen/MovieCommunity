<template>
  <div>
    <div class='myMovie' @click="goToMovieReviewPage(review.movie[0][0].id)">
            <div class='movieTitle'> {{ review.movie[0][0].title }}</div>
            <div> 내가 준 평균 평점 : {{review.my_vote.star__avg}} </div>
            <div> 내가 쓴 댓글 수 : {{ review.my_review_count }}</div>
            <!-- <div v-if="isCommentAdded" class="new-comment"> <i class="far fa-bell"></i> 내 리뷰에 새로운 답글 {{review.newly_added_review_counts}} 개가 달렸어요! </div> -->
            <div v-if="commentsNumber" class="new-comment"> 
              <span style="color: Tomato">
                <i class="fas fa-bell"></i> 
              </span>
                내 리뷰에 새로운 답글 {{review.newly_added_review_counts}} 개가 달렸어요! 
            </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'MyPageReview',
  props: {
    review: Object
  },
  data() {
    return {
      isCommentAdded: true
    }
  },

  computed: {
    commentsNumber() {
      if (this.review.newly_added_review_counts == 0) {
        return false
      }
      else {
        return true
      }
    }
  },
  methods: {
    goToMovieReviewPage(movieId) {
        console.log('gotomovie')
        this.$router.push(`/movies/${movieId}/reviews/`)
    },
  },
}
</script>

<style scoped>

.movieTitle {
  font-size: 20px;
  font-weight: bold;
}
</style>