<template>

  <div>
    <div class="header">
      <h2>LogIn</h2>  
    </div>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="credentials.username"
        :counter="10"
        label="ID"
        required
      ></v-text-field>

      <v-text-field
        v-model="credentials.password"
        :type="show1 ? 'text' : 'password'"
        label="password"
        required
        @keypress.enter="accountLogin"
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        class="mr-4"
        @click="accountLogin"
      >
      로그인
      </v-btn>
      <div style="margin: 10px; color: red;">{{errorMessage}}</div>
    </v-form>
  </div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'

  export default {
    name : 'Login',
    data: () => ({
      valid: true,
      show1 : false,
      errorMessage: '',
      credentials: {
        username : '',
        password: '',
      },
    }),

    methods: {
      ...mapMutations(['toggleLoginState', 'fetchLoggedInUsername']),
      ...mapGetters(['LoggedInUserData']),

      accountLogin() {
        this.$store.dispatch('LOGIN', this.credentials)
          .then(() => {
            this.$router.push('/')
          })
      },
      validate () {
        this.$refs.form.validate()
      },
    },
  }
</script>