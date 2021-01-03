<template>
  <div>
    <li class='comment' style="margin-left:1%; list-style: none;padding: 12px !important; border-top:1px solid; border-radius:10px; border-color: #EEE; ">
      <span class="comment" style="font-size:20px; font-color:black; margin-left:1%">
        <i class="fa fa-share fa-flip-vertical re" style=color:#ccc;></i>
        {{ comment.content }} 
      </span>
      <span class="comment-createdTime">{{createdDate}}</span>
    </li>
  </div>
</template>

<script>
import moment from 'moment'


export default {
 name: 'ReviewComment',
 props: {
   comment: Object,
 },
 data() {
   return {
     createdDate: moment(this.comment.created_at).format('YYYY-MM-DD, h:mm'),
   }
 },
}
</script>

<style scoped>
.comment-createdTime {
  font-size: 10px;
}


</style>