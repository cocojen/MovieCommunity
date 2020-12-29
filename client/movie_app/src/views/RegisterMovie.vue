<template>
  <div>
    <h1 class="register-title">Register Your Movie Here!</h1>
    <span>등록하고자 하는 영화를 IMDB 웹사이트에서 검색하여 개별 영화의 페이지 링크를 아래 창에 입력해주세요.</span>
    <span> <br> IMDB 웹사이트  <i class="fas fa-arrow-right"></i><a href="https://www.imdb.com/?ref_=nv_home"> https://www.imdb.com/?ref_=nv_home</a></span>
    <p>주소 입력 예시 <i class="fas fa-arrow-right"> </i> <a href="https://www.imdb.com/title/tt7876510/?ref_=hm_tpks_tt_1_pd_tp1">https://www.imdb.com/title/tt7876510/?ref_=hm_tpks_tt_1_pd_tp1</a> </p> 
    <v-text-field :rules="rules" @keypress.enter="go" v-model="value"></v-text-field>
    
  </div>
</template>

<script>
import axios from 'axios'
import bus from '../utils/bus'

const api_url = 'http://127.0.0.1:8000/api/v1/movie_community/register_movie/'

export default {
  name: 'RegisterMovie',
    data: () => ({
      value: '',
      rules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 100 || 'Max 20 characters',
        value => {
          const pattern = 'www.imdb.com/title'
          return value.includes(pattern) || 'Invalid URL'
        },
      ],
    }),
  methods: {
    go() {
      
      bus.$emit('start:spinner')
      console.log('start spinner')
      const myToken = localStorage.getItem('jwt')
      const headers = {headers : {'Authorization' : 'JWT ' + myToken }}
      console.log('go')
      console.log(this.value)
      axios.post(api_url, {url: this.value}, headers)
      .then(res => {
        console.log(res)
        bus.$emit('end:spinner')
      })
      .catch(err => {
        console.log(err)
      })
    },
  },

  created() {
  },
}
</script>
  

<style>
.register-title {
  color: black;
  font-family: 'Ubuntu', sans-serif;
}
</style>

