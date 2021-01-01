<template>
  <div>
    <div class="header">
      <h2>Sign up</h2>  
    </div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="credentials.username"
        :counter="10"
        :rules="nameRules"
        label="ID"
        required
      ></v-text-field>

      <v-text-field
        v-model="credentials.password"
        :type="show1 ? 'text' : 'password'"
        label="password"
        required
      ></v-text-field>

      <v-text-field
        v-model="credentials.passwordConfirmation"
        :type="show1 ? 'text' : 'password'"
        label="password confirmation"
        required
      ></v-text-field>

      <v-checkbox
        :rules="[v => !!v || 'You must agree to continue!']"
        label="욕설, 비난, 혐오발언을 하지 않겠습니다"
        required  
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        class="mr-4"
        @click="signup"
      >
        회원가입
      </v-btn>

      <v-btn
        class="mr-4"
        @click="reset"
      >
        초기화
      </v-btn>

    </v-form>
  </div>
</template>

<script>
import axios from 'axios'

// const SERVER_URL = 'http://3.35.18.1:8000/api/v1/movie_community/accounts/'
const SERVER_URL = 'http://localhost:8000/api/v1/movie_community/accounts/'

  export default {
    name : 'Signup',
    data: () => ({
      credentials: {
        username : '',
        password : '',
        passwordConfirmation : '',
      },
      show1: false,
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
    }),

    methods: {
      signup() {
        console.log(this.credentials)
        axios.post(SERVER_URL + 'signup/', this.credentials)
          .then((res) => {
            console.log(res)
            this.$router.push({name:'Login'})
          })
          .catch((err) => {
            console.log(err)
          })
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>